import { StateSchema } from 'app/providers/StoreProvider';

export const getUserId = (state: StateSchema) => state.user?.id || '';
export const getUserProfileId = (state: StateSchema) => state.user?.profileId ?? '';
export const getUserAuthorizedDevices = (state: StateSchema) => state.user?.authorizedDevices || [];
export const getUserPhone = (state: StateSchema) => state.user?.phone || '';
export const getUserEmail = (state: StateSchema) => state.user?.email || '';
