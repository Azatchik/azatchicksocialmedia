import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DeviceSchema } from '../types/DeviceSchema';

const initialState: DeviceSchema = {
};

export const DeviceSlice = createSlice({
    name: 'Device',
    initialState,
    reducers: {
        saveDevice: (state, action: PayloadAction<string>) => {
            state.device = action.payload;
        },
        saveTimezone: (state, action: PayloadAction<string>) => {
            state.timezone = action.payload;
        },
    },
});

export const { actions: DeviceActions } = DeviceSlice;
export const { reducer: DeviceReducer } = DeviceSlice;
