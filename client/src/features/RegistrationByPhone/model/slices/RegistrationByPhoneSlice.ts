import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSetPassword } from '../services/fetchSetPassword/fetchSetPassword';
import { fetchConfirmCode } from '../services/fetchConfirmCode/fetchConfirmCode';
import { RegistrationByPhoneSchema } from '../types/RegistrationByPhoneSchema';
import { fetchAuthentication } from '../services/fetchAuthentication/fetchAuthentication';

const initialState: RegistrationByPhoneSchema = {
};

export const RegistrationByPhoneSlice = createSlice({
    name: 'RegistrationByPhone',
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
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        clearToken: (state) => {
            state._token = '';
        },
        clearAll: (state) => {
            state.phone = '';
            state.code = '';
            state.email = '';
            state.password = '';
            state.passwordConfirm = '';
            state._currentCode = '';
            state._token = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthentication.pending, (state) => {
                state.serverError = undefined;
                state.validationErrors = undefined;
                state.isLoading = true;
            })
            .addCase(fetchAuthentication.fulfilled, (state, action) => {
                state.isLoading = false;
                state._token = action.payload.token;
                state._currentCode = action.payload.code;
            })
            .addCase(fetchAuthentication.rejected, (state, action) => {
                state.isLoading = false;
                if (typeof action.payload === 'string') {
                    state.serverError = action.payload;
                }
                if (typeof action.payload === 'object') {
                    state.validationErrors = action.payload;
                }
            })
            // Подтверждение кода
            .addCase(fetchConfirmCode.pending, (state) => {
                state.serverError = undefined;
                state.validationErrors = undefined;
                state.isLoading = true;
            })
            .addCase(fetchConfirmCode.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchConfirmCode.rejected, (state, action) => {
                state.isLoading = false;
                if (typeof action.payload === 'string') {
                    state.serverError = action.payload;
                }
                if (typeof action.payload === 'object') {
                    state.validationErrors = action.payload;
                }
            })
            // Установка пароля
            .addCase(fetchSetPassword.pending, (state) => {
                state.serverError = undefined;
                state.validationErrors = undefined;
                state.isLoading = true;
            })
            .addCase(fetchSetPassword.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchSetPassword.rejected, (state, action) => {
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

export const { actions: RegistrationByPhoneActions } = RegistrationByPhoneSlice;
export const { reducer: RegistrationByPhoneReducer } = RegistrationByPhoneSlice;
