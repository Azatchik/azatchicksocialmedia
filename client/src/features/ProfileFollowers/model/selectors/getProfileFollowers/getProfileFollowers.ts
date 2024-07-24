import { StateSchema } from 'app/providers/StoreProvider';

export const getProfileFollowersMembers = (state: StateSchema) => state.profileFollowers?.members ?? [];
export const getProfileFollowersIsLoading = (state: StateSchema) => state.profileFollowers?.isLoading ?? false;
export const getProfileFollowersError = (state: StateSchema) => state.profileFollowers?.error ?? '';
