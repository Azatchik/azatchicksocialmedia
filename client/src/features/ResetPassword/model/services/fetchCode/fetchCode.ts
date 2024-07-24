import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { getResetPasswordMethod, getResetPasswordPhone } from '../../selectors/getResetPassword/getResetPassword';
import { ResetPasswordValidateErrorTypes } from '../../types/ResetPasswordValidateErrorTypes';

interface FetchCodeReturnData {
    token: string;
    code?: string;
}

export const fetchCode = createAsyncThunk<
    FetchCodeReturnData,
    void,
    ThunkConfig<string | ResetPasswordValidateErrorTypes[]>
>(
    'features/ResetPassword/fetchCode',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const method = getResetPasswordMethod(getState());
        const phone = getResetPasswordPhone(getState());

        try {
            const response = await extra.api.post<FetchCodeReturnData>('/api/resets/get-code', {
                method,
                phone,
            });

            if (!response.data) {
                throw new Error();
            }

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
