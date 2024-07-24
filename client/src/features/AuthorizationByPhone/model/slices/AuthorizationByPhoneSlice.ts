import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAuthorization } from '../services/fetchAuthorization/fetchAuthorization';
import { AuthorizationByPhoneSchema } from '../types/AuthorizationByPhoneSchema';

const initialState: AuthorizationByPhoneSchema = {
};

export const AuthorizationByPhoneSlice = createSlice({
    name: 'AuthorizationByPhone',
    initialState,
    reducers: {
        setPhone: (state, action: PayloadAction<string>) => {
            state.phone = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthorization.pending, (state) => {
                state.serverError = undefined;
                state.validationErrors = undefined;
                state.isLoading = true;
            })
            .addCase(fetchAuthorization.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(fetchAuthorization.rejected, (state, action) => {
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

export const { actions: AuthorizationByPhoneActions } = AuthorizationByPhoneSlice;
export const { reducer: AuthorizationByPhoneReducer } = AuthorizationByPhoneSlice;
