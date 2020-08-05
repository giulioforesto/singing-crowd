import { IAudioParam, IAudioParamRenderer, IMinimalOfflineAudioContext, IOfflineAudioContext } from '../interfaces';
import { TContext } from './context';
export declare type TAddAudioParamConnectionsFunction = <T extends TContext>(audioParam: IAudioParam, audioParamRenderer: T extends IMinimalOfflineAudioContext | IOfflineAudioContext ? IAudioParamRenderer : null) => void;
//# sourceMappingURL=/build/es2019/types/add-audio-param-connections-function.d.ts.map