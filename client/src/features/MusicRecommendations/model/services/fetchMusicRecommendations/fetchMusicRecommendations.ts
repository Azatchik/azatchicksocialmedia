import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { MusicSchema } from 'entities/Music';
import { getUserProfileId } from 'entities/User';
import { MusicPlayerActions } from 'widgets/MusicPlayer';

interface fetchMusicRecommendationsReturnData {
    recommendationMusic: MusicSchema[],
}

export const fetchMusicRecommendations = createAsyncThunk<
    fetchMusicRecommendationsReturnData,
    void,
    ThunkConfig<string>
>(
    'features/MusicRecommendations/fetchMusicRecommendations',
    async (_, thunkApi) => {
        const {
            extra, rejectWithValue, getState, dispatch,
        } = thunkApi;
        const userProfileId = getUserProfileId(getState());

        try {
            const response = await extra.api.post<fetchMusicRecommendationsReturnData>('/api/music/get-music-recommendations', {
                profileId: userProfileId,
            });

            if (!response.data) {
                throw new Error();
            }

            dispatch(MusicPlayerActions.addMusicArray(response.data.recommendationMusic));
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
