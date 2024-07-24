import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileRecommendationSchema } from 'entities/ProfileRecommendation';
import { fetchSubscribeRecommendations } from '../services/fetchSubscribeRecommendations/fetchSubscribeRecommendations';
import { SubscribeRecommendationsSchema } from '../types/SubscribeRecommendationsSchema';

const initialState: SubscribeRecommendationsSchema = {
    isLoading: false,
};

export const SubscribeRecommendationsSlice = createSlice({
    name: 'SubscribeRecommendations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubscribeRecommendations.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchSubscribeRecommendations.fulfilled, (state, action: PayloadAction<{members: ProfileRecommendationSchema[]}>) => {
                state.isLoading = false;
                state.members = action.payload.members;
            })
            .addCase(fetchSubscribeRecommendations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: SubscribeRecommendationsActions } = SubscribeRecommendationsSlice;
export const { reducer: SubscribeRecommendationsReducer } = SubscribeRecommendationsSlice;
