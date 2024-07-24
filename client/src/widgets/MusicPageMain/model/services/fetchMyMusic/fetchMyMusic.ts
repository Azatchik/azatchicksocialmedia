import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { MusicSchema } from 'entities/Music';
import { MusicPlayerActions } from 'widgets/MusicPlayer';
import { MusicPageMainMyMusicActions } from '../../slices/MusicPageMainMyMusicSlice';
import {
    getMusicPageMainMyMusicPage,
    getMusicPageMainMyMusicProfileId,
} from '../../selectors/getMusicPageMainMyMusic/getMusicPageMainMyMusic';

interface fetchMyMusicReturnData {
    music: MusicSchema[],
    currentProfileMusic: string[],
}

export const fetchMyMusic = createAsyncThunk<
    fetchMyMusicReturnData,
    void,
    ThunkConfig<string>
>(
    'widgets/MusicPageMain/fetchMyMusic',
    async (_, thunkApi) => {
        const {
            extra, rejectWithValue, getState, dispatch,
        } = thunkApi;
        const page = getMusicPageMainMyMusicPage(getState());
        const profileId = getMusicPageMainMyMusicProfileId(getState());

        try {
            const response = await extra.api.post<fetchMyMusicReturnData>('/api/music/get-music', {
                profileId,
                limit: 15,
                page,
            });

            if (!response.data) {
                throw new Error();
            }

            dispatch(MusicPlayerActions.addMusicArray(response.data.music));
            if (response.data.music.length < 15) {
                dispatch(MusicPageMainMyMusicActions.setHasMore(false));
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
