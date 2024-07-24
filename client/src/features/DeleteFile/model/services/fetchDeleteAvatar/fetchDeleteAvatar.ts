import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { ProfileActions } from 'entities/Profile';
import { getUserProfileId } from 'entities/User';

export const fetchDeleteAvatar = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'features/DeleteFile/fetchDeleteAvatar',
    async (_, thunkApi) => {
        const {
            extra,
            rejectWithValue,
            dispatch,
            getState,
        } = thunkApi;
        const userProfileId = getUserProfileId(getState());

        try {
            const response = await extra.api.post('/api/profiles/delete-avatar', {
                profileId: userProfileId,
            });

            if (!response.data) {
                throw new Error();
            }

            dispatch(ProfileActions.setAvatar(''));
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
