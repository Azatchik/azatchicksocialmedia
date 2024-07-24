import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { validatePhone } from '../validatePhone/validatePhone';
import {
    RegistrationByPhoneValidateErrorTypes,
} from '../../types/RegistrationByPhoneValidateErrorTypes';
import {
    getRegistrationByPhonePhone,
} from '../../selectors/getRegistrationByPhone/getRegistrationByPhone';
import { RegistrationByPhoneSchema } from '../../types/RegistrationByPhoneSchema';

interface FetchAuthenticationReturnData {
    token?: string;
    code?: string;
}

export const fetchAuthentication = createAsyncThunk<
    FetchAuthenticationReturnData,
    void,
    ThunkConfig<string | RegistrationByPhoneValidateErrorTypes[]>
>(
    'features/RegistrationByPhone/fetchAuthentication',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const phone = getRegistrationByPhonePhone(getState());

        const errors = validatePhone(phone);
        if (errors.length) {
            return rejectWithValue(errors);
        }

        try {
            const response = await extra.api.post<FetchAuthenticationReturnData>('/api/authentication/authenticate', {
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
