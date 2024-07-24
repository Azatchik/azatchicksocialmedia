import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { getUserProfileId } from 'entities/User';

export const fetchUnsubscribe = createAsyncThunk<
    void,
    string,
    ThunkConfig<string>
>(
    'entities/ProfileRecommendation/fetchUnsubscribe',
    async (publisher, thunkApi) => {
        const {
            extra, rejectWithValue, getState, dispatch,
        } = thunkApi;
        const profileId = getUserProfileId(getState());

        try {
            const response = await extra.api.post('/api/profiles/unsubscribe', {
                profileId,
                publisher,
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
