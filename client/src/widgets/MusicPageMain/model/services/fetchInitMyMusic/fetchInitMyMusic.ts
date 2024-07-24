import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { MusicSchema } from 'entities/Music';
import { MusicPlayerActions } from 'widgets/MusicPlayer';
import { getUserProfileId } from 'entities/User';
import { MusicPageMainMyMusicActions } from '../../slices/MusicPageMainMyMusicSlice';
import {
    getMusicPageMainMyMusicPage,
    getMusicPageMainMyMusicProfileId,
} from '../../selectors/getMusicPageMainMyMusic/getMusicPageMainMyMusic';

interface fetchInitMyMusicReturnData {
    music: MusicSchema[],
    currentProfileMusic: string[],
}

export const fetchInitMyMusic = createAsyncThunk<
    fetchInitMyMusicReturnData,
    void,
    ThunkConfig<string>
>(
    'widgets/MusicPageMain/fetchInitMyMusic',
    async (_, thunkApi) => {
        const {
            extra, rejectWithValue, getState, dispatch,
        } = thunkApi;
        const profileId = getMusicPageMainMyMusicProfileId(getState());
        const userProfileId = getUserProfileId(getState());

        try {
            const response = await extra.api.post<fetchInitMyMusicReturnData>('/api/music/get-music', {
                profileId,
                userProfileId,
                limit: 15,
                page: 1,
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
