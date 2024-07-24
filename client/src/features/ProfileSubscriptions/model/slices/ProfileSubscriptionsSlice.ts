import { createSlice } from '@reduxjs/toolkit';
import { fetchSubscriptions } from '../services/fetchSubscriptions/fetchSubscriptions';
import { ProfileSubscriptionsSchema } from '../types/ProfileSubscriptionsSchema';

const initialState: ProfileSubscriptionsSchema = {
    isLoading: false,
};

export const ProfileSubscriptionsSlice = createSlice({
    name: 'ProfileSubscriptions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubscriptions.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchSubscriptions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.members = action.payload.members;
            })
            .addCase(fetchSubscriptions.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: ProfileSubscriptionsActions } = ProfileSubscriptionsSlice;
export const { reducer: ProfileSubscriptionsReducer } = ProfileSubscriptionsSlice;
