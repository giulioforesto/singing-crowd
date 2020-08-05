import { IBaseAudioContext } from '../interfaces';
import { TContext } from './context';
import { TNativeContext } from './native-context';
export declare type TBaseAudioContextConstructor = new <T extends TContext>(nativeContext: TNativeContext, numberOfChannels: number) => IBaseAudioContext<T>;
//# sourceMappingURL=/build/es2019/types/base-audio-context-constructor.d.ts.map