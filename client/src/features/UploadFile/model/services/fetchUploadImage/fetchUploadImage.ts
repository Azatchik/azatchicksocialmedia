import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { ProfileActions } from 'entities/Profile';
import { getUserProfileId } from 'entities/User';

interface FetchUploadImageReturnData {
    fileName: string;
}

export const fetchUploadImage = createAsyncThunk<
    FetchUploadImageReturnData,
    File,
    ThunkConfig<string>
>(
    'features/UploadImage/fetchUploadImage',
    async (file, thunkApi) => {
        const {
            extra,
            rejectWithValue,
            dispatch,
            getState,
        } = thunkApi;
        const profileId = getUserProfileId(getState());
        const formData = new FormData();
        formData.append('image', file);
        formData.append('profileId', profileId);

        try {
            const response = await extra.api.post<FetchUploadImageReturnData>(
                '/api/profiles/upload-image',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );

            if (!response.data) {
                throw new Error();
            }

            dispatch(ProfileActions.addImage(response.data.fileName));
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
