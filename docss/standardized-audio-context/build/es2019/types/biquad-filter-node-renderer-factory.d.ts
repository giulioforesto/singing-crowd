import { IAudioNodeRenderer, IBiquadFilterNode, IMinimalOfflineAudioContext, IOfflineAudioContext } from '../interfaces';
export declare type TBiquadFilterNodeRendererFactory = <T extends IMinimalOfflineAudioContext | IOfflineAudioContext>() => IAudioNodeRenderer<T, IBiquadFilterNode<T>>;
//# sourceMappingURL=/build/es2019/types/biquad-filter-node-renderer-factory.d.ts.map