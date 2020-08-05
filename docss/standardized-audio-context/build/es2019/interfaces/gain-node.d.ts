import { TContext } from '../types';
import { IAudioNode } from './audio-node';
import { IAudioParam } from './audio-param';
export interface IGainNode<T extends TContext> extends IAudioNode<T> {
    readonly gain: IAudioParam;
}
//# sourceMappingURL=/build/es2019/interfaces/gain-node.d.ts.map