import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MusicSchema } from 'entities/Music';
import { ProfileMediaMusicSchema } from '../types/ProfileMediaMusicSchema';
import { fetchMusic } from '../services/fetchMusic/fetchMusic';

const initialState: ProfileMediaMusicSchema = {
    _inited: false,
};

export const ProfileMediaMusicSlice = createSlice({
    name: 'ProfileMedia',
    initialState,
    reducers: {
        addMusic: (state, action) => {
            if (state.music) {
                if (state.music.length < 6) {
                    state.music = [...state.music, action.payload];
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMusic.pending, (state) => {
                state._inited = false;
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchMusic.fulfilled, (state, action: PayloadAction<{music: MusicSchema[]}>) => {
                state.isLoading = false;
                state.music = action.payload.music;
                state._inited = true;
            })
            .addCase(fetchMusic.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state._inited = true;
            });
    },
});

export const { actions: ProfileMediaMusicActions } = ProfileMediaMusicSlice;
export const { reducer: ProfileMediaMusicReducer } = ProfileMediaMusicSlice;
