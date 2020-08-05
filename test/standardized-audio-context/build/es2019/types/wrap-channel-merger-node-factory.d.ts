import { TInvalidStateErrorFactory } from './invalid-state-error-factory';
import { TMonitorConnectionsFunction } from './monitor-connections-function';
import { TNativeAudioNodeFactory } from './native-audio-node-factory';
import { TWrapChannelMergerNodeFunction } from './wrap-channel-merger-node-function';
export declare type TWrapChannelMergerNodeFactory = (createInvalidStateError: TInvalidStateErrorFactory, createNativeAudioNode: TNativeAudioNodeFactory, monitorConnectionsFunction: TMonitorConnectionsFunction) => TWrapChannelMergerNodeFunction;
//# sourceMappingURL=/build/es2019/types/wrap-channel-merger-node-factory.d.ts.map