import { assignNativeAudioNodeOptions } from '../helpers/assign-native-audio-node-options';
export const createNativeMediaStreamAudioDestinationNodeFactory = (createNativeAudioNode, createNotSupportedError) => {
    return (nativeAudioContext, options) => {
        // Bug #64: Edge does not support MediaStreamAudioDestinationNodes.
        if (nativeAudioContext.createMediaStreamDestination === undefined) {
            throw createNotSupportedError();
        }
        const nativeMediaStreamAudioDestinationNode = createNativeAudioNode(nativeAudioContext, (ntvDCntxt) => {
            return ntvDCntxt.createMediaStreamDestination();
        });
        assignNativeAudioNodeOptions(nativeMediaStreamAudioDestinationNode, options);
        // Bug #174: Safari does expose a wrong numberOfOutputs.
        if (nativeMediaStreamAudioDestinationNode.numberOfOutputs === 1) {
            Object.defineProperty(nativeMediaStreamAudioDestinationNode, 'numberOfOutputs', { get: () => 0 });
        }
        return nativeMediaStreamAudioDestinationNode;
    };
};
//# sourceMappingURL=/build/es2019/factories/native-media-stream-audio-destination-node-factory.js.map