import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { getUserProfileId } from 'entities/User';
import { getProfileData, ProfileActions } from 'entities/Profile';

export const fetchSubscribe = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'features/SubscribeToggle/fetchSubscribe',
    async (_, thunkApi) => {
        const {
            extra, rejectWithValue, getState, dispatch,
        } = thunkApi;
        const profileId = getUserProfileId(getState());
        const profileData = getProfileData(getState());
        const publisher = profileData.id;

        try {
            const response = await extra.api.post('/api/profiles/subscribe', {
                profileId,
                publisher,
            });

            if (!response.data) {
                throw new Error();
            }

            dispatch(ProfileActions.addFollower(profileId));
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
