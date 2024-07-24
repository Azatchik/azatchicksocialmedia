import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { Profile } from 'entities/Profile';
import { getUserProfileId } from 'entities/User';

export const fetchProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<string>
>(
    'pages/editProfilePage/fetchProfileData',
    async (_, thunkApi) => {
        const {
            extra,
            dispatch,
            rejectWithValue,
            getState,
        } = thunkApi;
        const profileId = getUserProfileId(getState());

        if (!profileId) {
            return rejectWithValue('profileId empty!');
        }

        try {
            const response = await extra.api.post<Profile>('/api/profiles/get-profile', {
                profileId,
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
