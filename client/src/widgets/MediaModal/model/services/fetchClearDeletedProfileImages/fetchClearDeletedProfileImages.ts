import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { getUserProfileId } from 'entities/User';
import { getMediaDeletedArray } from 'entities/Media';

export const fetchClearDeletedProfileImages = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'widgets/MediaModal/fetchDeleteProfileImage',
    async (_, thunkApi) => {
        const {
            extra,
            rejectWithValue,
            getState,
            dispatch,
        } = thunkApi;
        const profileId = getUserProfileId(getState());
        const arrayImages = getMediaDeletedArray(getState());

        try {
            const response = await extra.api.post('/api/profiles/delete-images', {
                profileId,
                arrayImages,
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
