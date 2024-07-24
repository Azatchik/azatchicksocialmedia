import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { MusicPageMainMyMusicActions } from '../../slices/MusicPageMainMyMusicSlice';
import { fetchMyMusic } from '../fetchMyMusic/fetchMyMusic';
import {
    getMusicPageMainMyMusicHasMore,
    getMusicPageMainMyMusicIsLoading, getMusicPageMainMyMusicIsLoadingNext,
    getMusicPageMainMyMusicPage,
} from '../../selectors/getMusicPageMainMyMusic/getMusicPageMainMyMusic';

export const fetchMyMusicNext = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'widgets/MusicPageMain/fetchMyMusicNext',
    async (_, thunkApi) => {
        const { getState, dispatch } = thunkApi;
        const hasMore = getMusicPageMainMyMusicHasMore(getState());
        const isLoading = getMusicPageMainMyMusicIsLoading(getState());
        const isLoadingNext = getMusicPageMainMyMusicIsLoadingNext(getState());
        const page = getMusicPageMainMyMusicPage(getState());

        if (hasMore && !isLoading && !isLoadingNext) {
            dispatch(MusicPageMainMyMusicActions.setPage(page + 1));
            dispatch(fetchMyMusic());
            console.log('WORKED');
        }
    },
);
