import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { getUserId, UserActions, UserSchema } from 'entities/User';
import { TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { getDeviceData } from 'entities/Device';
import { validatePassword } from '../validatePassword/validatePassword';
import { validatePasswordConfirm } from '../validatePasswordConfirm/validatePasswordConfirm';
import { getResetPasswordPassword, getResetPasswordPasswordConfirm } from '../../selectors/getResetPassword/getResetPassword';
import { ResetPasswordValidateErrorTypes } from '../../types/ResetPasswordValidateErrorTypes';
import { ResetPasswordActions } from '../../slices/ResetPasswordSlice';

interface FetchResetPasswordReturnData extends UserSchema {
    token: string;
}

export const fetchResetPassword = createAsyncThunk<
    FetchResetPasswordReturnData,
    void,
    ThunkConfig<string | ResetPasswordValidateErrorTypes[]>
>(
    'features/ResetPassword/fetchResetPassword',
    async (_, thunkApi) => {
        const {
            extra, rejectWithValue, getState, dispatch,
        } = thunkApi;
        const id = getUserId(getState());
        const password = getResetPasswordPassword(getState());
        const passwordConfirm = getResetPasswordPasswordConfirm(getState());
        const device = getDeviceData(getState());

        const passwordErrors = validatePassword(password);
        const passwordConfirmErrors = validatePasswordConfirm(passwordConfirm, password);

        const errors = [...passwordErrors, ...passwordConfirmErrors];

        if (errors.length) {
            return rejectWithValue(errors);
        }

        try {
            const response = await extra.api.post<FetchResetPasswordReturnData>('/api/resets/set-password', {
                id,
                password,
                device,
            });

            if (!response.data) {
                throw new Error();
            }

            dispatch(ResetPasswordActions.clearAll());
            dispatch(UserActions.setUser(response.data));
            localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, response.data.token);
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
