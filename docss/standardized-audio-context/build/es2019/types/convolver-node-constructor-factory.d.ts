import { TAudioNodeConstructor } from './audio-node-constructor';
import { TConvolverNodeConstructor } from './convolver-node-constructor';
import { TConvolverNodeRendererFactory } from './convolver-node-renderer-factory';
import { TGetNativeContextFunction } from './get-native-context-function';
import { TIsNativeOfflineAudioContextFunction } from './is-native-offline-audio-context-function';
import { TNativeConvolverNodeFactory } from './native-convolver-node-factory';
export declare type TConvolverNodeConstructorFactory = (audioNodeConstructor: TAudioNodeConstructor, createConvolverNodeRenderer: TConvolverNodeRendererFactory, createNativeConvolverNode: TNativeConvolverNodeFactory, getNativeContext: TGetNativeContextFunction, isNativeOfflineAudioContext: TIsNativeOfflineAudioContextFunction) => TConvolverNodeConstructor;
//# sourceMappingURL=/build/es2019/types/convolver-node-constructor-factory.d.ts.map