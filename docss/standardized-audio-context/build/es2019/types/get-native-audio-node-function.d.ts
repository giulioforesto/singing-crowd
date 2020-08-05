import { IAudioNode, INativeAudioNodeFaker } from '../interfaces';
import { TContext } from './context';
import { TNativeAudioNode } from './native-audio-node';
export declare type TGetNativeAudioNodeFunction = <T extends TContext, U extends TNativeAudioNode | INativeAudioNodeFaker>(audioNode: IAudioNode<T>) => U;
//# sourceMappingURL=/build/es2019/types/get-native-audio-node-function.d.ts.map