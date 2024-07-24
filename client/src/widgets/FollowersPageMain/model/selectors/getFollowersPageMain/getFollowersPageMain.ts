import { StateSchema } from 'app/providers/StoreProvider';

export const getFollowersPageMainIsLoading = (state: StateSchema) => state.followersPageMain?.isLoading ?? false;
export const getFollowersPageMainError = (state: StateSchema) => state.followersPageMain?.error ?? '';
