import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUploadMusic } from 'features/UploadFile/model/services/fetchUploadMusic/fetchUploadMusic';
import { fetchUploadImage } from '../services/fetchUploadImage/fetchUploadImage';
import { UploadFileSchema } from '../types/UploadFileSchema';
import { fetchUploadHeader } from '../services/fetchUploadHeader/fetchUploadHeader';
import { fetchUploadAvatar } from '../services/fetchUploadAvatar/fetchUploadAvatar';

const initialState: UploadFileSchema = {
    isLoading: false,
};

export const UploadFileSlice = createSlice({
    name: 'UploadFile',
    initialState,
    reducers: {
        setFileName: (state, action: PayloadAction<string>) => {
            state.fileName = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUploadImage.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchUploadImage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.fileName = '';
            })
            .addCase(fetchUploadImage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // обложка
            .addCase(fetchUploadHeader.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchUploadHeader.fulfilled, (state, action) => {
                state.isLoading = false;
                state.fileName = '';
            })
            .addCase(fetchUploadHeader.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // aватар
            .addCase(fetchUploadAvatar.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchUploadAvatar.fulfilled, (state, action) => {
                state.isLoading = false;
                state.fileName = '';
            })
            .addCase(fetchUploadAvatar.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // музыка
            .addCase(fetchUploadMusic.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchUploadMusic.fulfilled, (state, action) => {
                state.isLoading = false;
                state.fileName = '';
            })
            .addCase(fetchUploadMusic.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: UploadFileActions } = UploadFileSlice;
export const { reducer: UploadFileReducer } = UploadFileSlice;
