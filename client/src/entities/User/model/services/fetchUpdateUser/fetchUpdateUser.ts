import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { getDeviceData } from 'entities/Device';
import { TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { UserActions } from '../../slices/UserSlice';
import { UserSchema } from '../../types/UserSchema';

interface FetchUpdateUserReturnProps extends UserSchema {
    newJwtToken: string;
}

export const fetchUpdateUser = createAsyncThunk<
    FetchUpdateUserReturnProps,
    void,
    ThunkConfig<string>
>(
    'entities/fetchUpdateUser',
    async (_, thunkApi) => {
        const {
            extra,
            dispatch,
            rejectWithValue,
            getState,
        } = thunkApi;
        const device = getDeviceData(getState());
        const jwtToken = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);

        if (!jwtToken || !device) {
            return rejectWithValue('Token or device not found in browser');
        }

        try {
            const response = await extra.api.post<FetchUpdateUserReturnProps>('/api/users/updateAuthorization', {
                jwtToken,
                device,
            });

            if (!response.data) {
                throw new Error();
            }

            dispatch(UserActions.setUser(response.data));
            localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, response.data.newJwtToken);
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
