import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchConfirmResetCode } from '../services/fetchConfirmResetCode/fetchConfirmResetCode';
import { fetchCode } from '../services/fetchCode/fetchCode';
import { fetchMethods } from '../services/fetchMethods/fetchMethods';
import { ResetPasswordSchema } from '../types/ResetPasswordSchema';
import { fetchResetPassword } from '../services/fetchResetPassword/fetchResetPassword';

const initialState: ResetPasswordSchema = {
};

export const ResetPasswordSlice = createSlice({
    name: 'ResetPassword',
    initialState,
    reducers: {
        setPhone: (state, action: PayloadAction<string>) => {
            state.phone = action.payload;
        },
        setCode: (state, action: PayloadAction<string>) => {
            state.code = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setPasswordConfirm: (state, action: PayloadAction<string>) => {
            state.passwordConfirm = action.payload;
        },
        setMethod: (state, action: PayloadAction<string>) => {
            state.method = action.payload;
        },
        clearToken: (state) => {
            state._token = '';
        },
        clearAll: (state) => {
            state.phone = '';
            state.code = '';
            state.password = '';
            state.passwordConfirm = '';
            state._currentCode = '';
            state._token = '';
            state.method = '';
            state._methods = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMethods.pending, (state) => {
                state.serverError = undefined;
                state.validationErrors = undefined;
                state.isLoading = true;
            })
            .addCase(fetchMethods.fulfilled, (state, action) => {
                state.isLoading = false;
                state._methods = action.payload.methods;
                state.method = action.payload.methods[0] as string;
            })
            .addCase(fetchMethods.rejected, (state, action) => {
                state.isLoading = false;
                if (typeof action.payload === 'string') {
                    state.serverError = action.payload;
                }
                if (typeof action.payload === 'object') {
                    state.validationErrors = action.payload;
                }
            })
            .addCase(fetchCode.pending, (state) => {
                state.serverError = undefined;
                state.validationErrors = undefined;
                state.isLoading = true;
            })
            .addCase(fetchCode.fulfilled, (state, action) => {
                state.isLoading = false;
                state._currentCode = action.payload.code ?? '';
                state._token = action.payload.token;
            })
            .addCase(fetchCode.rejected, (state, action) => {
                state.isLoading = false;
                state.serverError = action.payload as string;
            })
            // Отправка кода
            .addCase(fetchConfirmResetCode.pending, (state) => {
                state.serverError = undefined;
                state.validationErrors = undefined;
                state.isLoading = true;
            })
            .addCase(fetchConfirmResetCode.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchConfirmResetCode.rejected, (state, action) => {
                state.isLoading = false;
                if (typeof action.payload === 'string') {
                    state.serverError = action.payload;
                }
                if (typeof action.payload === 'object') {
                    state.validationErrors = action.payload;
                }
            })
            .addCase(fetchResetPassword.pending, (state) => {
                state.serverError = undefined;
                state.validationErrors = undefined;
                state.isLoading = true;
            })
            .addCase(fetchResetPassword.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchResetPassword.rejected, (state, action) => {
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

export const { actions: ResetPasswordActions } = ResetPasswordSlice;
export const { reducer: ResetPasswordReducer } = ResetPasswordSlice;
