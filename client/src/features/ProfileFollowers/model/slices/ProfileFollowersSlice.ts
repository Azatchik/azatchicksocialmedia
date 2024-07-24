import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFollowers } from '../services/fetchSubscriptions/fetchFollowers';
import { ProfileFollowersSchema } from '../types/ProfileFollowersSchema';

const initialState: ProfileFollowersSchema = {
    isLoading: false,
};

export const ProfileFollowersSlice = createSlice({
    name: 'ProfileFollowers',
    initialState,
    reducers: {
        removeFollower: (state, action: PayloadAction<string>) => {
            state.members = state.members?.filter((member) => member.profileId !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFollowers.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchFollowers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.members = action.payload.members;
            })
            .addCase(fetchFollowers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: ProfileFollowersActions } = ProfileFollowersSlice;
export const { reducer: ProfileFollowersReducer } = ProfileFollowersSlice;
