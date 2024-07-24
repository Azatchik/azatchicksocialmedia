import { MusicSchema } from 'entities/Music';

export interface MusicPlayerSchema {
    music: MusicSchema;
    musicArray: MusicSchema[];
    isPlaying: boolean;
    musicIndex: number;
    duration?: number;
    currentTime: number;
    volume: number;
}
