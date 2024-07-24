import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { getDeviceData } from 'entities/Device';
import {
    getUserId, getUserProfileId, UserActions, UserSchema,
} from 'entities/User';
import { TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import {
    getCreateProfileBirthDay,
    getCreateProfileBirthMonth,
    getCreateProfileBirthYear,
    getCreateProfileFirstName,
    getCreateProfileSecondName,
} from '../../selectors/getCreateProfile/getCreateProfile';
import { validateFirstName } from '../validateFirstName/validateFirstName';
import { validateSecondName } from '../validateSecondName/validateSecondName';
import { CreateProfileValidateErrorTypes } from '../../types/CreateProfileValidateErrorTypes';

interface FetchCreateProfileReturnProps extends UserSchema {
    token: string;
}

export const fetchCreateProfile = createAsyncThunk<
    FetchCreateProfileReturnProps,
    void,
    ThunkConfig<string | CreateProfileValidateErrorTypes[]>
>(
    'features/CreateProfile/fetchCreateProfile',
    async (_, thunkApi) => {
        const {
            extra,
            dispatch,
            rejectWithValue,
            getState,
        } = thunkApi;
        const device = getDeviceData(getState());
        const id = getUserId(getState());
        const firstName = getCreateProfileFirstName(getState());
        const secondName = getCreateProfileSecondName(getState());
        const birthDay = getCreateProfileBirthDay(getState());
        const birthMonth = getCreateProfileBirthMonth(getState());
        const birthYear = getCreateProfileBirthYear(getState());

        const errorsFirstName = validateFirstName(firstName);
        const errorsSecondName = validateSecondName(secondName);

        const errors = [
            ...errorsFirstName,
            ...errorsSecondName,
        ];

        if (errors.length) {
            return rejectWithValue(errors);
        }

        try {
            const response = await extra.api.post<FetchCreateProfileReturnProps>('/api/profiles/create', {
                id,
                firstName,
                secondName,
                birthDay,
                birthMonth,
                birthYear,
                device,
            });

            if (!response.data) {
                throw new Error();
            }

            dispatch(UserActions.addDevice(response.data.token));
            dispatch(UserActions.setProfileId(response.data as UserSchema));
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
