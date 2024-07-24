import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { EditableProfileData, EditProfilePageSchema } from '../types/EditProfilePageSchema';

const initialState: EditProfilePageSchema = {
    form: {},
    data: {},
    isLoading: false,
    isChanged: false,
};

export const EditProfilePageSlice = createSlice({
    name: 'EditProfilePageSlice',
    initialState,
    reducers: {
        setBio: (state, action: PayloadAction<string>) => {
            state.form.bio = action.payload;
            state.isChanged = true;
        },
        setCity: (state, action: PayloadAction<string>) => {
            state.form.city = action.payload;
            state.isChanged = true;
        },
        setEducation: (state, action: PayloadAction<string>) => {
            state.form.education = action.payload;
            state.isChanged = true;
        },
        setLifeStatus: (state, action: PayloadAction<string>) => {
            state.form.lifeStatus = action.payload;
            state.isChanged = true;
        },
        setFamilyStatus: (state, action: PayloadAction<string>) => {
            state.form.familyStatus = action.payload;
            state.isChanged = true;
        },
        setLanguages: (state, action: PayloadAction<string>) => {
            state.form.languages = action.payload;
            state.isChanged = true;
        },
        clearChanges: (state) => {
            state.form = state.data;
            state.isChanged = false;
        },
        saveChanges: (state) => {
            state.data = state.form;
            state.isChanged = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<EditableProfileData>) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload;
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: EditProfilePageActions } = EditProfilePageSlice;
export const { reducer: EditProfilePageReducer } = EditProfilePageSlice;
