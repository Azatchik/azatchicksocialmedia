import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { UserActions } from 'entities/User';
import { RegistrationByPhoneActions } from '../../slices/RegistrationByPhoneSlice';
import {
    getRegistrationByPhoneCode,
    getRegistrationByPhoneToken,
} from '../../selectors/getRegistrationByPhone/getRegistrationByPhone';
import { validateCode } from '../validateCode/validateCode';
import {
    RegistrationByPhoneValidateErrorTypes,
} from '../../types/RegistrationByPhoneValidateErrorTypes';

interface FetchConfirmCodeReturnData {
    userId?: string;
}

export const fetchConfirmCode = createAsyncThunk<
    FetchConfirmCodeReturnData,
    void,
    ThunkConfig<string | RegistrationByPhoneValidateErrorTypes[]>
>(
    'features/RegistrationByPhone/fetchConfirmCode',
    async (_, thunkApi) => {
        const {
            extra,
            dispatch,
            rejectWithValue,
            getState,
        } = thunkApi;
        const token = getRegistrationByPhoneToken(getState());
        const code = getRegistrationByPhoneCode(getState());

        const errors = validateCode(code);
        if (errors.length) {
            return rejectWithValue(errors);
        }

        try {
            const response = await extra.api.post<FetchConfirmCodeReturnData>('/api/authentication/verify', {
                token,
                code,
            });

            if (!response.data) {
                throw new Error();
            }

            dispatch(UserActions.setId(response.data.userId as string));
            dispatch(RegistrationByPhoneActions.clearToken());
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
