import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchMusicRecommendations } from '../services/fetchMusicRecommendations/fetchMusicRecommendations';
import { MusicRecommendationsSchema } from '../types/MusicRecommendationsSchema';

const initialState: MusicRecommendationsSchema = {
    isLoading: false,
    addedMusic: [],
};

export const MusicRecommendationsSlice = createSlice({
    name: 'MusicRecommendations',
    initialState,
    reducers: {
        addMusic: (state, action: PayloadAction<string>) => {
            state.addedMusic = [...state.addedMusic, action.payload];
        },
        removeAddedMusic: (state, action: PayloadAction<string>) => {
            state.addedMusic = state.addedMusic.filter((item) => item !== action.payload);
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMusicRecommendations.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
                state.data = undefined;
            })
            .addCase(fetchMusicRecommendations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.recommendationMusic;
            })
            .addCase(fetchMusicRecommendations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: MusicRecommendationsActions } = MusicRecommendationsSlice;
export const { reducer: MusicRecommendationsReducer } = MusicRecommendationsSlice;
