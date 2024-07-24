import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { ProfileActions } from 'entities/Profile';
import { getUserProfileId } from 'entities/User';
import { MusicSchema } from 'entities/Music';
import { MusicPageMainMyMusicActions } from 'widgets/MusicPageMain';
import { MusicPlayerActions } from 'widgets/MusicPlayer';

interface FetchUploadMusicReturnData {
    music: MusicSchema;
}

export const fetchUploadMusic = createAsyncThunk<
    FetchUploadMusicReturnData,
    File,
    ThunkConfig<string>
>(
    'features/UploadFile/fetchUploadMusic',
    async (file, thunkApi) => {
        const {
            extra,
            rejectWithValue,
            dispatch,
            getState,
        } = thunkApi;
        const profileId = getUserProfileId(getState());
        const formData = new FormData();
        formData.append('music', file);
        formData.append('profileId', profileId);

        try {
            const response = await extra.api.post<FetchUploadMusicReturnData>(
                '/api/music/add-music',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );

            if (!response.data) {
                throw new Error();
            }

            dispatch(MusicPageMainMyMusicActions.addCurrentMusic(response.data.music.id));
            dispatch(MusicPageMainMyMusicActions.addMusic(response.data.music));
            dispatch(MusicPlayerActions.addMusicArray([response.data.music]));
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError instanceof Error && axiosError.response) {
                return rejectWithValue(axiosError.response.data.message);
            }
            // Обработка других типов ошибок
            console.log(error);
            return rejectWithValue('An unexpected error occurred');
        }
    },
);
