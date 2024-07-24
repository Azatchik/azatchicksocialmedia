import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { getUserProfileId } from 'entities/User';

export const fetchDeleteMusic = createAsyncThunk<
    void,
    string | undefined,
    ThunkConfig<string>
>(
    'entities/Music/fetchDeleteMusic',
    async (musicId, thunkApi) => {
        const {
            extra,
            rejectWithValue,
            dispatch,
            getState,
        } = thunkApi;
        const profileId = getUserProfileId(getState());

        if (!musicId) {
            return rejectWithValue('Empty musicId');
        }

        try {
            const response = await extra.api.post('/api/profiles/delete-music', {
                profileId,
                musicId,
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
            console.log(error);
            return rejectWithValue('An unexpected error occurred');
        }
    },
);
