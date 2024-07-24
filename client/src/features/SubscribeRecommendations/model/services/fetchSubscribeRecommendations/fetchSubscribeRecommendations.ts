import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { ProfileRecommendationSchema } from 'entities/ProfileRecommendation';
import { getUserProfileId } from 'entities/User';

interface FetchSubscribeRecommendationsReturnData {
    members: ProfileRecommendationSchema[];
}

export const fetchSubscribeRecommendations = createAsyncThunk<
    FetchSubscribeRecommendationsReturnData,
    void,
    ThunkConfig<string>
>(
    'features/SubscribeRecommendations/fetchSubscribeRecommendations',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const profileId = getUserProfileId(getState());

        try {
            const response = await extra.api.post<FetchSubscribeRecommendationsReturnData>('/api/profiles/get-subscribe-recommendations', {
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
