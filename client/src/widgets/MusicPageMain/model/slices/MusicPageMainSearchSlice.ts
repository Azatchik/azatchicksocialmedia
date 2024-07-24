import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MusicSchema } from 'entities/Music';
import { StateSchema } from 'app/providers/StoreProvider';
import { MusicPageMainSearchSchema } from '../types/MusicPageMainSearchSchema';
import { fetchSearch } from '../services/fetchSearch/fetchSearch';

const searchAdapter = createEntityAdapter<MusicSchema>({
    selectId: (myMusic) => myMusic.id,
});

export const getMusicPageMainSearch = searchAdapter.getSelectors<StateSchema>(
    (state) => state.musicPageMainSearch || searchAdapter.getInitialState(),
);

export const MusicPageMainSearchSlice = createSlice({
    name: 'MusicPageMainSearchSlice',
    initialState: searchAdapter.getInitialState<MusicPageMainSearchSchema>({
        isLoading: false,
        error: undefined,
        query: '',
        ids: [],
        entities: {},
    }),
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearch.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchSearch.fulfilled, (
                state,
                action: PayloadAction<{searchedMusic: MusicSchema[]}>,
            ) => {
                state.isLoading = false;
                searchAdapter.setAll(state, action.payload.searchedMusic);
            })
            .addCase(fetchSearch.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: MusicPageMainSearchActions } = MusicPageMainSearchSlice;
export const { reducer: MusicPageMainSearchReducer } = MusicPageMainSearchSlice;
