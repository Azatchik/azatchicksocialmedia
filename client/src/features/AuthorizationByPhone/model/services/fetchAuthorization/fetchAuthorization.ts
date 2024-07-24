import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { UserActions, UserSchema } from 'entities/User';
import { getDeviceData } from 'entities/Device';
import { TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { validatePhone } from '../validatePhone/validatePhone';
import { validatePassword } from '../validatePassword/validatePassword';
import {
    getAuthorizationByPhonePassword,
    getAuthorizationByPhonePhone,
} from '../../selectors/getAuthorizationByPhone/getAuthorizationByPhone';
import {
    AuthorizationByPhoneValidateErrorTypes,
} from '../../types/AuthorizationByPhoneValidateErrorTypes';

interface FetchAuthorizationReturnData extends UserSchema {
    token: string;
}

export const fetchAuthorization = createAsyncThunk<
    FetchAuthorizationReturnData,
    void,
    ThunkConfig<string | AuthorizationByPhoneValidateErrorTypes[]>
>(
    'features/AuthorizationByPhone/fetchAuthorization',
    async (_, thunkApi) => {
        const {
            extra, rejectWithValue, getState, dispatch,
        } = thunkApi;
        const phone = getAuthorizationByPhonePhone(getState());
        const password = getAuthorizationByPhonePassword(getState());
        const device = getDeviceData(getState());

        const phoneErrors = validatePhone(phone);
        const passwordErrors = validatePassword(password);

        const errors = [...phoneErrors, ...passwordErrors];

        if (errors.length) {
            return rejectWithValue(errors);
        }

        localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY);
        try {
            const response = await extra.api.post<FetchAuthorizationReturnData>('/api/users/authorization', {
                phone,
                password,
                device,
            });

            if (!response.data) {
                throw new Error();
            }

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
