import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { getProfileData, ProfileActions } from 'entities/Profile';
import { getUserProfileId } from 'entities/User';

export const fetchDeleteHeader = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'features/DeleteFile/fetchDeleteHeader',
    async (_, thunkApi) => {
        const {
            extra,
            rejectWithValue,
            dispatch,
            getState,
        } = thunkApi;
        const userProfileId = getUserProfileId(getState());
        const profileData = getProfileData(getState());

        try {
            const response = await extra.api.post('/api/profiles/delete-header', {
                profileId: userProfileId,
                fileName: profileData.headerImg,
            });

            if (!response.data) {
                throw new Error();
            }

            dispatch(ProfileActions.setHeader(''));
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
