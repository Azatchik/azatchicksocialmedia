import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { UserActions } from 'entities/User';
import { validateCode } from '../validateCode/validateCode';
import {
    getResetPasswordCode,
    getResetPasswordToken,
} from '../../selectors/getResetPassword/getResetPassword';
import { ResetPasswordValidateErrorTypes } from '../../types/ResetPasswordValidateErrorTypes';

interface FetchConfirmResetCodeReturnData {
    userId: string;
}

export const fetchConfirmResetCode = createAsyncThunk<
    FetchConfirmResetCodeReturnData,
    void,
    ThunkConfig<string | ResetPasswordValidateErrorTypes[]>
>(
    'features/ResetPassword/fetchConfirmResetCode',
    async (_, thunkApi) => {
        const {
            extra, rejectWithValue, getState, dispatch,
        } = thunkApi;
        const token = getResetPasswordToken(getState());
        const code = getResetPasswordCode(getState());

        const errors = validateCode(code);
        if (errors.length) {
            return rejectWithValue(errors);
        }

        try {
            const response = await extra.api.post<FetchConfirmResetCodeReturnData>('/api/resets/verify', {
                token,
                code,
            });

            if (!response.data) {
                throw new Error();
            }

            dispatch(UserActions.setId(response.data.userId));
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
