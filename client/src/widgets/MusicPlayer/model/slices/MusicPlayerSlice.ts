import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MusicSchema } from 'entities/Music';
import { MusicPlayerSchema } from '../types/MusicPlayerSchema';

const initialState: MusicPlayerSchema = {
    musicIndex: 0,
    musicArray: [],
    isPlaying: false,
    music: {
        id: '',
        file: '',
        creator: '',
    },
    currentTime: 0,
    volume: 0.5,
};

export const MusicPlayerSlice = createSlice({
    name: 'MusicPlayer',
    initialState,
    reducers: {
        setIsPlaying: (state, action) => {
            state.isPlaying = action.payload;
        },
        addMusicArray: (state, action: PayloadAction<MusicSchema[]>) => {
            if (state.musicArray.length) {
                const ids = state.musicArray.map((item) => item.id);
                const newArray = action.payload.filter((item) => !ids.includes(item.id));
                state.musicArray = [...state.musicArray, ...newArray];
            } else {
                state.musicArray = action.payload;
            }
        },
        setMusic: (state, action: PayloadAction<MusicSchema>) => {
            state.music = action.payload;
            state.musicIndex = state.musicArray.map((item) => item.id).indexOf(action.payload.id);
        },
        nextMusicIndex: (state) => {
            if (state.musicIndex < state.musicArray.length - 1) {
                const newIndex = state.musicIndex + 1;
                state.musicIndex = newIndex;
                state.music = state.musicArray[newIndex];
            } else {
                const newIndex = 0;
                state.musicIndex = newIndex;
                state.music = state.musicArray[newIndex];
            }
        },
        prevMusicIndex: (state) => {
            if (state.musicIndex > 0) {
                const newIndex = state.musicIndex - 1;
                state.musicIndex = newIndex;
                state.music = state.musicArray[newIndex];
            } else {
                const newIndex = state.musicArray.length - 1;
                state.musicIndex = newIndex;
                state.music = state.musicArray[newIndex];
            }
        },
        setDuration: (state, action) => {
            state.duration = action.payload;
        },
        incrementCurrentTime: (state) => {
            state.currentTime += 1;
        },
        clearCurrentTime: (state) => {
            state.currentTime = 0;
        },
        setCurrentTime: (state, action) => {
            state.currentTime = action.payload;
        },
        setVolume: (state, action) => {
            state.volume = action.payload;
        },
    },
});

export const { actions: MusicPlayerActions } = MusicPlayerSlice;
export const { reducer: MusicPlayerReducer } = MusicPlayerSlice;
