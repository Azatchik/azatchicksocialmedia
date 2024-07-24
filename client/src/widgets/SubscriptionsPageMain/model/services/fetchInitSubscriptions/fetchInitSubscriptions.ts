import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { SubscriptionSchema } from 'entities/Subscription';

interface FetchInitSubscriptions {
    members: SubscriptionSchema[];
}

export const fetchInitSubscriptions = createAsyncThunk<
    FetchInitSubscriptions,
    string,
    ThunkConfig<string>
>(
    'widgets/SubscriptionsPageMain/fetchInitSubscriptions',
    async (profileId, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;

        try {
            const response = await extra.api.post<FetchInitSubscriptions>('/api/profiles/get-subscriptions', {
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
