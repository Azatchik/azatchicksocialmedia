import { StateSchema } from 'app/providers/StoreProvider';

export const getMusicPageMainSearchIsLoading = (state: StateSchema) => state.musicPageMainSearch?.isLoading ?? false;
export const getMusicPageMainSearchError = (state: StateSchema) => state.musicPageMainSearch?.error ?? '';
export const getMusicPageMainSearchQuery = (state: StateSchema) => state.musicPageMainSearch?.query ?? '';
