import { StateSchema } from 'app/providers/StoreProvider';

export const getDeviceData = (state: StateSchema) => state.device?.device ?? '';
export const getDeviceTimezone = (state: StateSchema) => state.device?.timezone ?? '';
