import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { ProfileActions } from 'entities/Profile';
import { getUserProfileId } from 'entities/User';
import { EditProfilePageActions, getEditProfileForm } from 'pages/EditProfilePage';

export const fetchSaveChanges = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'features/UploadHeader/fetchUploadHeader',
    async (_, thunkApi) => {
        const {
            extra,
            rejectWithValue,
            dispatch,
            getState,
        } = thunkApi;
        const userProfileId = getUserProfileId(getState());
        const form = getEditProfileForm(getState());

        try {
            const response = await extra.api.post('/api/profiles/edit-profile', {
                form,
                profileId: userProfileId,
            });

            if (!response.data) {
                throw new Error();
            }

            dispatch(EditProfilePageActions.saveChanges());
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
