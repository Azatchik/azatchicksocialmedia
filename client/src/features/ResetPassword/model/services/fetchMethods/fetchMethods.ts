import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { getResetPasswordPhone } from '../../selectors/getResetPassword/getResetPassword';
import { validatePhone } from '../validatePhone/validatePhone';
import { ResetPasswordValidateErrorTypes } from '../../types/ResetPasswordValidateErrorTypes';

interface FetchMethodsReturnData {
    methods: string[];
}

export const fetchMethods = createAsyncThunk<
    FetchMethodsReturnData,
    void,
    ThunkConfig<string | ResetPasswordValidateErrorTypes[]>
>(
    'features/ResetPassword/fetchMethods',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const phone = getResetPasswordPhone(getState());

        const errors = validatePhone(phone);
        if (errors.length) {
            return rejectWithValue(errors);
        }

        try {
            const response = await extra.api.post<FetchMethodsReturnData>('/api/resets/get-methods', {
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
