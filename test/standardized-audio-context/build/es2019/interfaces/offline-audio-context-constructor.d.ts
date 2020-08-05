import { IOfflineAudioContext } from './offline-audio-context';
import { IOfflineAudioContextOptions } from './offline-audio-context-options';
export interface IOfflineAudioContextConstructor {
    new (options: IOfflineAudioContextOptions): IOfflineAudioContext;
    new (numberOfChannels: number, length: number, sampleRate: number): IOfflineAudioContext;
}
//# sourceMappingURL=/build/es2019/interfaces/offline-audio-context-constructor.d.ts.map