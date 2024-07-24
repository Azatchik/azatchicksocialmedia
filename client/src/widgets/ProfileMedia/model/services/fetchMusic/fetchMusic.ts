import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { getProfileData } from 'entities/Profile';
import { MusicPlayerActions } from 'widgets/MusicPlayer';
import { MusicSchema } from 'entities/Music';

interface fetchMusicReturnType {
    music: MusicSchema[];
}

export const fetchMusic = createAsyncThunk<
    fetchMusicReturnType,
    void,
    ThunkConfig<string>
>(
    'widgets/fetchMusic',
    async (_, thunkApi) => {
        const {
            extra,
            dispatch,
            rejectWithValue,
            getState,
        } = thunkApi;
        const profileData = getProfileData(getState());

        try {
            const response = await extra.api.post<fetchMusicReturnType>('/api/music/get-music', {
                profileId: profileData.id,
                limit: 8,
                page: 1,
                random: true,
            });

            if (!response.data) {
                throw new Error();
            }

            dispatch(MusicPlayerActions.addMusicArray(response.data.music));
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
