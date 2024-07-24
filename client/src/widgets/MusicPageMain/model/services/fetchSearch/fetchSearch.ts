import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { MusicSchema } from 'entities/Music';
import { getUserProfileId } from 'entities/User';
import { getMusicPageMainSearchQuery } from '../../selectors/getMusicPageMainSearch/getMusicPageMainSearch';

interface fetchSearchReturnData {
    searchedMusic: MusicSchema[],
}

export const fetchSearch = createAsyncThunk<
    fetchSearchReturnData,
    void,
    ThunkConfig<string>
>(
    'widgets/MusicPageMain/fetchSearch',
    async (_, thunkApi) => {
        const {
            extra, rejectWithValue, getState, dispatch,
        } = thunkApi;
        const profileId = getUserProfileId(getState());
        const query = getMusicPageMainSearchQuery(getState());

        try {
            const response = await extra.api.post<fetchSearchReturnData>('/api/music/search-music', {
                profileId,
                query,
                limit: 15,
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
