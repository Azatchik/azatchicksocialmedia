import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { FollowerSchema } from 'entities/Follower';

interface FetchInitFollowers {
    members: FollowerSchema[];
}

export const fetchInitFollowers = createAsyncThunk<
    FetchInitFollowers,
    string,
    ThunkConfig<string>
>(
    'widgets/FollowersPageMain/fetchInitFollowers',
    async (profileId, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;

        try {
            const response = await extra.api.post<FetchInitFollowers>('/api/profiles/get-followers', {
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
