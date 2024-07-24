import { StateSchema } from 'app/providers/StoreProvider';

export const getProfileSubscriptionsMembers = (state: StateSchema) => state.profileSubscriptions?.members ?? [];
export const getProfileSubscriptionsIsLoading = (state: StateSchema) => state.profileSubscriptions?.isLoading ?? false;
export const getProfileSubscriptionsError = (state: StateSchema) => state.profileSubscriptions?.error ?? '';
