import { StateSchema } from 'app/providers/StoreProvider';
import { MusicSchema } from 'entities/Music';

export const getMusicPlayerIsPlaying = (state: StateSchema) => state.musicPlayer?.isPlaying ?? false;
export const getMusicPlayerMusicArray = (state: StateSchema) => state.musicPlayer?.musicArray ?? [] as MusicSchema[];
export const getMusicPlayerMusic = (state: StateSchema) => state.musicPlayer?.music ?? {} as MusicSchema;
export const getMusicPlayerMusicIndex = (state: StateSchema) => state.musicPlayer?.musicIndex ?? 0;
export const getMusicPlayerCurrentTime = (state: StateSchema) => state.musicPlayer?.currentTime ?? 0;
export const getMusicPlayerDuration = (state: StateSchema) => state.musicPlayer?.duration ?? 0;
export const getMusicPlayerVolume = (state: StateSchema) => state.musicPlayer?.volume ?? 0;
