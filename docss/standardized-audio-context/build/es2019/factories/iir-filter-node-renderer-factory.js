import { filterBuffer } from '../helpers/filter-buffer';
import { isOwnedByContext } from '../helpers/is-owned-by-context';
const filterFullBuffer = (renderedBuffer, nativeOfflineAudioContext, feedback, feedforward) => {
    const feedbackLength = feedback.length;
    const feedforwardLength = feedforward.length;
    const minLength = Math.min(feedbackLength, feedforwardLength);
    if (feedback[0] !== 1) {
        for (let i = 0; i < feedbackLength; i += 1) {
            feedforward[i] /= feedback[0];
        }
        for (let i = 1; i < feedforwardLength; i += 1) {
            feedback[i] /= feedback[0];
        }
    }
    const bufferLength = 32;
    const xBuffer = new Float32Array(bufferLength);
    const yBuffer = new Float32Array(bufferLength);
    const filteredBuffer = nativeOfflineAudioContext.createBuffer(renderedBuffer.numberOfChannels, renderedBuffer.length, renderedBuffer.sampleRate);
    const numberOfChannels = renderedBuffer.numberOfChannels;
    for (let i = 0; i < numberOfChannels; i += 1) {
        const input = renderedBuffer.getChannelData(i);
        const output = filteredBuffer.getChannelData(i);
        xBuffer.fill(0);
        yBuffer.fill(0);
        filterBuffer(feedback, feedbackLength, feedforward, feedforwardLength, minLength, xBuffer, yBuffer, 0, bufferLength, input, output);
    }
    return filteredBuffer;
};
export const createIIRFilterNodeRendererFactory = (createNativeAudioBufferSourceNode, createNativeAudioNode, getNativeAudioNode, nativeOfflineAudioContextConstructor, renderInputsOfAudioNode, renderNativeOfflineAudioContext) => {
    return (feedback, feedforward) => {
        const renderedNativeAudioNodes = new WeakMap();
        let filteredBufferPromise = null;
        const createAudioNode = async (proxy, nativeOfflineAudioContext, trace) => {
            let nativeAudioBufferSourceNode = null;
            let nativeIIRFilterNode = getNativeAudioNode(proxy);
            // If the initially used nativeIIRFilterNode was not constructed on the same OfflineAudioContext it needs to be created again.
            const nativeIIRFilterNodeIsOwnedByContext = isOwnedByContext(nativeIIRFilterNode, nativeOfflineAudioContext);
            // Bug #9: Safari does not support IIRFilterNodes.
            if (nativeOfflineAudioContext.createIIRFilter === undefined) {
                nativeAudioBufferSourceNode = createNativeAudioBufferSourceNode(nativeOfflineAudioContext, {
                    buffer: null,
                    channelCount: 2,
                    channelCountMode: 'max',
                    channelInterpretation: 'speakers',
                    loop: false,
                    loopEnd: 0,
                    loopStart: 0,
                    playbackRate: 1
                });
            }
            else if (!nativeIIRFilterNodeIsOwnedByContext) {
                nativeIIRFilterNode = createNativeAudioNode(nativeOfflineAudioContext, (ntvCntxt) => {
                    return ntvCntxt.createIIRFilter(feedforward, feedback);
                });
            }
            renderedNativeAudioNodes.set(nativeOfflineAudioContext, nativeAudioBufferSourceNode === null ? nativeIIRFilterNode : nativeAudioBufferSourceNode);
            if (nativeAudioBufferSourceNode !== null) {
                if (filteredBufferPromise === null) {
                    if (nativeOfflineAudioContextConstructor === null) {
                        throw new Error('Missing the native OfflineAudioContext constructor.');
                    }
                    const partialOfflineAudioContext = new nativeOfflineAudioContextConstructor(
                    // Bug #47: The AudioDestinationNode in Edge and Safari gets not initialized correctly.
                    proxy.context.destination.channelCount, 
                    // Bug #17: Safari does not yet expose the length.
                    proxy.context.length, nativeOfflineAudioContext.sampleRate);
                    filteredBufferPromise = (async () => {
                        await renderInputsOfAudioNode(proxy, partialOfflineAudioContext, partialOfflineAudioContext.destination, trace);
                        const renderedBuffer = await renderNativeOfflineAudioContext(partialOfflineAudioContext);
                        return filterFullBuffer(renderedBuffer, nativeOfflineAudioContext, feedback, feedforward);
                    })();
                }
                const filteredBuffer = await filteredBufferPromise;
                nativeAudioBufferSourceNode.buffer = filteredBuffer;
                nativeAudioBufferSourceNode.start(0);
                return nativeAudioBufferSourceNode;
            }
            await renderInputsOfAudioNode(proxy, nativeOfflineAudioContext, nativeIIRFilterNode, trace);
            return nativeIIRFilterNode;
        };
        return {
            render(proxy, nativeOfflineAudioContext, trace) {
                const renderedNativeAudioNode = renderedNativeAudioNodes.get(nativeOfflineAudioContext);
                if (renderedNativeAudioNode !== undefined) {
                    return Promise.resolve(renderedNativeAudioNode);
                }
                return createAudioNode(proxy, nativeOfflineAudioContext, trace);
            }
        };
    };
};
//# sourceMappingURL=/build/es2019/factories/iir-filter-node-renderer-factory.js.map