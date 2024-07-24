import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { ProfileSubscriptionsSchema } from '../../types/ProfileSubscriptionsSchema';

export const fetchSubscriptions = createAsyncThunk<
    ProfileSubscriptionsSchema,
    string,
    ThunkConfig<string>
>(
    'features/ProfileSubscriptions/fetchSubscriptions',
    async (profileId, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;

        try {
            const response = await extra.api.post<ProfileSubscriptionsSchema>('/api/profiles/get-subscriptions', {
                profileId,
                number: 6,
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
