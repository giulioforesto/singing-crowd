import { AUDIO_PARAM_CONNECTIONS_STORE } from '../globals';
import { getValueForKey } from './get-value-for-key';
export const getAudioParamConnections = (audioParam) => {
    return getValueForKey(AUDIO_PARAM_CONNECTIONS_STORE, audioParam);
};
//# sourceMappingURL=/build/es2019/helpers/get-audio-param-connections.js.map