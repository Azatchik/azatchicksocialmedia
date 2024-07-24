import { StateSchema } from 'app/providers/StoreProvider';

export const getMusicPageMainMyMusicIsLoading = (state: StateSchema) => state.musicPageMainMyMusic?.isLoading || false;
export const getMusicPageMainMyMusicIsLoadingNext = (state: StateSchema) => state.musicPageMainMyMusic?.isLoadingNext || false;
export const getMusicPageMainMyMusicError = (state: StateSchema) => state.musicPageMainMyMusic?.error ?? '';
export const getMusicPageMainMyMusicPage = (state: StateSchema) => state.musicPageMainMyMusic?.page || 1;
export const getMusicPageMainMyMusicHasMore = (state: StateSchema) => state.musicPageMainMyMusic?.hasMore || false;
export const getMusicPageMainMyMusicCurrentProfileMusic = (state: StateSchema) => state.musicPageMainMyMusic?.currentProfileMusic ?? [];
export const getMusicPageMainMyMusicProfileId = (state: StateSchema) => state.musicPageMainMyMusic?.profileId ?? '';
