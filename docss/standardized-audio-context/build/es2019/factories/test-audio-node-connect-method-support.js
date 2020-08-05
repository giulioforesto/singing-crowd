// Safari up to version 12.0 (but not v12.1) didn't return the destination in case it was an AudioNode.
export const createTestAudioNodeConnectMethodSupport = (nativeOfflineAudioContextConstructor) => {
    return () => {
        if (nativeOfflineAudioContextConstructor === null) {
            return false;
        }
        const nativeOfflineAudioContext = new nativeOfflineAudioContextConstructor(1, 1, 44100);
        const nativeGainNode = nativeOfflineAudioContext.createGain();
        const isSupported = nativeGainNode.connect(nativeGainNode) === nativeGainNode;
        nativeGainNode.disconnect(nativeGainNode);
        return isSupported;
    };
};
//# sourceMappingURL=/build/es2019/factories/test-audio-node-connect-method-support.js.map