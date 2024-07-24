import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MusicSchema } from 'entities/Music';
import { StateSchema } from 'app/providers/StoreProvider';
import { MusicPageMainMyMusicSchema } from '../types/MusicPageMainMyMusicSchema';
import { fetchMyMusic } from '../services/fetchMyMusic/fetchMyMusic';
import { fetchInitMyMusic } from '../services/fetchInitMyMusic/fetchInitMyMusic';

const myMusicAdapter = createEntityAdapter<MusicSchema>({
    selectId: (myMusic) => myMusic.id,
});

export const getMusicPageMainMyMusic = myMusicAdapter.getSelectors<StateSchema>(
    (state) => state.musicPageMainMyMusic || myMusicAdapter.getInitialState(),
);

export const MusicPageMainMyMusicSlice = createSlice({
    name: 'MusicPageMainMyMusicSlice',
    initialState: myMusicAdapter.getInitialState<MusicPageMainMyMusicSchema>({
        isLoading: false,
        isLoadingNext: false,
        error: undefined,
        page: 1,
        hasMore: true,
        profileId: '',
        currentProfileMusic: [],
        ids: [],
        entities: {},
    }),
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setHasMore: (state, action: PayloadAction<boolean>) => {
            state.hasMore = action.payload;
        },
        addMusic: (state, action: PayloadAction<MusicSchema>) => {
            state.ids = [action.payload.id, ...state.ids];
            state.entities = { [action.payload.id]: action.payload, ...state.entities };
        },
        addCurrentMusic: (state, action: PayloadAction<string>) => {
            state.currentProfileMusic = [...state.currentProfileMusic, action.payload];
        },
        removeCurrentMusic: (state, action: PayloadAction<string>) => {
            state.currentProfileMusic = state.currentProfileMusic.filter((item) => item !== action.payload);
        },
        removeMusic: (state, action: PayloadAction<string>) => {
            myMusicAdapter.removeOne(state, action.payload);
        },
        setProfileId: (state, action: PayloadAction<string>) => {
            state.profileId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInitMyMusic.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchInitMyMusic.fulfilled, (
                state,
                action: PayloadAction<{music: MusicSchema[], currentProfileMusic: string[]}>,
            ) => {
                state.isLoading = false;
                myMusicAdapter.addMany(state, action.payload.music);
                if (!state.currentProfileMusic.length) {
                    state.currentProfileMusic = action.payload.currentProfileMusic;
                }
            })
            .addCase(fetchInitMyMusic.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchMyMusic.pending, (state) => {
                state.error = undefined;
                state.isLoadingNext = true;
            })
            .addCase(fetchMyMusic.fulfilled, (
                state,
                action: PayloadAction<{music: MusicSchema[], currentProfileMusic: string[]}>,
            ) => {
                state.isLoadingNext = false;
                myMusicAdapter.addMany(state, action.payload.music);
            })
            .addCase(fetchMyMusic.rejected, (state, action) => {
                state.isLoadingNext = false;
                state.error = action.payload;
            });
    },
});

export const { actions: MusicPageMainMyMusicActions } = MusicPageMainMyMusicSlice;
export const { reducer: MusicPageMainMyMusicReducer } = MusicPageMainMyMusicSlice;
