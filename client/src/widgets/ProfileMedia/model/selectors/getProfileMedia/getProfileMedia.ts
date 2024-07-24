import { StateSchema } from 'app/providers/StoreProvider';

export const getProfileMediaMusic = (state: StateSchema) => state.profileMediaMusic?.music ?? [];
export const getProfileMediaMusicIsLoading = (state: StateSchema) => state.profileMediaMusic?.isLoading ?? false;
export const getProfileMediaMusicError = (state: StateSchema) => state.profileMediaMusic?.error ?? '';
export const getProfileMediaMusicInited = (state: StateSchema) => state.profileMediaMusic?._inited ?? false;
