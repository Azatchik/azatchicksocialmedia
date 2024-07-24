import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { FollowerSchema } from 'entities/Follower';
import { FollowersPageMainSchema } from '../types/FollowersPageMainSchema';
import { fetchInitFollowers } from '../services/fetchInitFollowers/fetchInitFollowers';

const followersAdapter = createEntityAdapter<FollowerSchema>({
    selectId: (follower) => follower.profileId,
});

export const getFollowersPageMain = followersAdapter.getSelectors<StateSchema>(
    (state) => state.followersPageMain || followersAdapter.getInitialState(),
);

export const FollowersPageMainSlice = createSlice({
    name: 'FollowersPageMainSlice',
    initialState: followersAdapter.getInitialState<FollowersPageMainSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInitFollowers.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchInitFollowers.fulfilled, (
                state,
                action: PayloadAction<{members: FollowerSchema[]}>,
            ) => {
                state.isLoading = false;
                followersAdapter.setAll(state, action.payload.members);
            })
            .addCase(fetchInitFollowers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: FollowersPageMainActions } = FollowersPageMainSlice;
export const { reducer: FollowersPageMainReducer } = FollowersPageMainSlice;
