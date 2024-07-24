import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CatalogTypes, MediaSchema } from '../types/MediaSchema';

const initialState: MediaSchema = {
    isOpen: false,
    arrayMedia: [],
    indexMedia: 0,
    arrayDeletedMedia: [],
    selectedMedia: '',
};

export const MediaSlice = createSlice({
    name: 'Media',
    initialState,
    reducers: {
        setCatalogMedia: (state, action: PayloadAction<CatalogTypes>) => {
            state.catalog = action.payload;
        },
        setArrayMedia: (state, action: PayloadAction<string[]>) => {
            state.arrayMedia = action.payload;
        },
        setIndexMedia: (state, action: PayloadAction<number>) => {
            state.indexMedia = action.payload;
        },
        setSelectedMedia: (state) => {
            state.selectedMedia = state.arrayMedia[state.indexMedia];
        },
        openMedia: (state) => {
            state.isOpen = true;
        },
        closeMedia: (state) => {
            state.isOpen = false;
        },
        initArrayDeletedMedia: (state) => {
            const filteredArray = state.arrayMedia.filter((media) => !state.arrayDeletedMedia.includes(media));
            state.arrayMedia = filteredArray;
        },
        addArrayDeleted: (state) => {
            state.arrayDeletedMedia = [...state.arrayDeletedMedia, state.selectedMedia];
        },
        setArrayDeleted: (state) => {
            const newArray = state.arrayDeletedMedia.filter((media) => media !== state.selectedMedia);
            state.arrayDeletedMedia = newArray;
        },
        clearArrayDeletedMedia: (state) => {
            state.arrayDeletedMedia = [];
        },
    },
});

export const { actions: MediaActions } = MediaSlice;
export const { reducer: MediaReducer } = MediaSlice;
