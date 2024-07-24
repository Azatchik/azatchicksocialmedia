import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { ProfileFollowersActions } from 'features/ProfileFollowers';
import { ProfileSubscriptionsActions } from 'features/ProfileSubscriptions';
import { ProfileMediaMusicActions } from 'widgets/ProfileMedia';
import { getUserProfileId } from 'entities/User';
import { Profile } from '../../types/ProfileSchema';

export const fetchProfileById = createAsyncThunk<
    Profile,
    undefined | string,
    ThunkConfig<string>
>(
    'entities/profile/fetchProfileById',
    async (profileId, thunkApi) => {
        const {
            extra,
            rejectWithValue,
            dispatch,
            getState,
        } = thunkApi;
        const userProfileId = getUserProfileId(getState());

        try {
            const response = await extra.api.post<Profile>('/api/profiles/get-profile', {
                profileId: profileId || userProfileId,
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
