import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { getUserId, UserActions, UserSchema } from 'entities/User';
import { validateEmail } from '../validateEmail/validateEmail';
import {
    getRegistrationByPhoneEmail,
    getRegistrationByPhonePassword,
    getRegistrationByPhonePasswordConfirm,
} from '../../selectors/getRegistrationByPhone/getRegistrationByPhone';
import { validatePassword } from '../validatePassword/validatePassword';
import { validatePasswordConfirm } from '../validatePasswordConfirm/validatePasswordConfirm';
import { RegistrationByPhoneValidateErrorTypes } from '../../types/RegistrationByPhoneValidateErrorTypes';

export const fetchSetPassword = createAsyncThunk<
    UserSchema,
    void,
    ThunkConfig<string | RegistrationByPhoneValidateErrorTypes[]>
>(
    'features/RegistrationByPhone/fetchSetPassword',
    async (_, thunkApi) => {
        const {
            extra,
            dispatch,
            rejectWithValue,
            getState,
        } = thunkApi;
        const id = getUserId(getState());
        const password = getRegistrationByPhonePassword(getState());
        const passwordConfirm = getRegistrationByPhonePasswordConfirm(getState());
        const email = getRegistrationByPhoneEmail(getState());

        const errorsEmail = validateEmail(email);
        const errorsPassword = validatePassword(password);
        const errorsPasswordConfirm = validatePasswordConfirm(passwordConfirm, password);
        const errors = [...errorsPassword, ...errorsPasswordConfirm, ...errorsEmail];
        if (errors.length) {
            return rejectWithValue(errors);
        }

        try {
            const response = await extra.api.post<UserSchema>('/api/users/confirm', {
                id,
                password,
                email,
            });

            if (!response.data) {
                throw new Error();
            }

            dispatch(UserActions.setPhone(response.data as UserSchema));
            dispatch(UserActions.setEmail(response.data as UserSchema));
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError instanceof Error && axiosError.response) {
                return rejectWithValue(axiosError.response.data.message);
            }
            // Обработка других типов ошибок
            return rejectWithValue('An unexpected error occurred');
        }
    },
);
