import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateProfileSchema } from '../types/CreateProfileSchema';
import { fetchCreateProfile } from '../services/fetchCreateProfile/fetchCreateProfile';

const initialState: CreateProfileSchema = {
    birthDay: '01',
    birthMonth: '01',
    birthYear: '1920',
};

export const CreateProfileSlice = createSlice({
    name: 'CreateProfile',
    initialState,
    reducers: {
        setFirstName: (state, action: PayloadAction<string>) => {
            state.firstName = action.payload;
        },
        setSecondName: (state, action: PayloadAction<string>) => {
            state.secondName = action.payload;
        },
        setBirthDay: (state, action: PayloadAction<string>) => {
            state.birthDay = action.payload;
        },
        setBirthMonth: (state, action: PayloadAction<string>) => {
            state.birthMonth = action.payload;
        },
        setBirthYear: (state, action: PayloadAction<string>) => {
            state.birthYear = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCreateProfile.pending, (state) => {
                state.serverError = undefined;
                state.validationErrors = undefined;
                state.isLoading = true;
            })
            .addCase(fetchCreateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(fetchCreateProfile.rejected, (state, action) => {
                state.isLoading = false;
                if (typeof action.payload === 'string') {
                    state.serverError = action.payload;
                }
                if (typeof action.payload === 'object') {
                    state.validationErrors = action.payload;
                }
            });
    },
});

export const { actions: CreateProfileActions } = CreateProfileSlice;
export const { reducer: CreateProfileReducer } = CreateProfileSlice;
