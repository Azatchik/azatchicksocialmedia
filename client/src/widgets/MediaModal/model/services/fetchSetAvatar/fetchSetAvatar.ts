import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { getUserProfileId } from 'entities/User';
import { getMediaSelectedMedia } from 'entities/Media';
import { ProfileActions } from 'entities/Profile';

export const fetchSetAvatar = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'widgets/MediaModal/fetchSetAvatar',
    async (_, thunkApi) => {
        const {
            extra,
            rejectWithValue,
            getState,
            dispatch,
        } = thunkApi;
        const profileId = getUserProfileId(getState());
        const image = getMediaSelectedMedia(getState());

        try {
            const response = await extra.api.post('/api/profiles/set-avatar', {
                profileId,
                image,
            });

            if (!response.data) {
                throw new Error();
            }

            dispatch(ProfileActions.setAvatar(image));
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
