import { StateSchema } from 'app/providers/StoreProvider';
import { Profile } from '../../types/ProfileSchema';

export const getProfileData = (state: StateSchema) => state.profile?.data ?? {} as Profile;
export const getProfileIsLoading = (state: StateSchema) => state.profile?.isLoading ?? false;
export const getProfileError = (state: StateSchema) => state.profile?.error ?? '';
