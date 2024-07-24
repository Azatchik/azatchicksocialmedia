import { StateSchema } from 'app/providers/StoreProvider';

export const getSubscriptionsPageMainIsLoading = (state: StateSchema) => state.subscriptionsPageMain?.isLoading ?? false;
export const getSubscriptionsPageMainError = (state: StateSchema) => state.subscriptionsPageMain?.error ?? '';
