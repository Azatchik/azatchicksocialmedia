import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { ProfileFollowersSchema } from '../../types/ProfileFollowersSchema';

export const fetchFollowers = createAsyncThunk<
    ProfileFollowersSchema,
    string,
    ThunkConfig<string>
>(
    'features/ProfileFollowers/fetchFollowers',
    async (profileId, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;

        try {
            const response = await extra.api.post<ProfileFollowersSchema>('/api/profiles/get-followers', {
                profileId,
                number: 8,
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
