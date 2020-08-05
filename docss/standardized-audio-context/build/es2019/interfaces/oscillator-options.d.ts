import { TOscillatorType } from '../types';
import { IAudioNodeOptions } from './audio-node-options';
import { IPeriodicWave } from './periodic-wave';
export interface IOscillatorOptions extends IAudioNodeOptions {
    detune: number;
    frequency: number;
    periodicWave?: IPeriodicWave;
    type: TOscillatorType;
}
//# sourceMappingURL=/build/es2019/interfaces/oscillator-options.d.ts.map