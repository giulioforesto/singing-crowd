import { IAudioContext } from './audio-context';
import { IAudioNode } from './audio-node';
import { IMinimalAudioContext } from './minimal-audio-context';
export interface IMediaElementAudioSourceNode<T extends IAudioContext | IMinimalAudioContext> extends IAudioNode<T> {
    readonly mediaElement: HTMLMediaElement;
}
//# sourceMappingURL=/build/es2019/interfaces/media-element-audio-source-node.d.ts.map