import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { SubscriptionSchema } from 'entities/Subscription';
import { SubscriptionsPageMainSchema } from '../types/SubscriptionsPageMainSchema';
import { fetchInitSubscriptions } from '../services/fetchInitSubscriptions/fetchInitSubscriptions';

const subscriptionsAdapter = createEntityAdapter<SubscriptionSchema>({
    selectId: (subscription) => subscription.profileId,
});

export const getSubscriptionsPageMain = subscriptionsAdapter.getSelectors<StateSchema>(
    (state) => state.subscriptionsPageMain || subscriptionsAdapter.getInitialState(),
);

export const SubscriptionsPageMainSlice = createSlice({
    name: 'SubscriptionsPageMainSlice',
    initialState: subscriptionsAdapter.getInitialState<SubscriptionsPageMainSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {
        addSubscription: (state, action) => {
            state.ids = [action.payload.id, ...state.ids];
            state.entities = { [action.payload.id]: action.payload, ...state.entities };
        },
        removeSubscription: (state, action: PayloadAction<string>) => {
            subscriptionsAdapter.removeOne(state, action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInitSubscriptions.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchInitSubscriptions.fulfilled, (
                state,
                action: PayloadAction<{members: SubscriptionSchema[]}>,
            ) => {
                state.isLoading = false;
                subscriptionsAdapter.setAll(state, action.payload.members);
            })
            .addCase(fetchInitSubscriptions.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: SubscriptionsPageMainActions } = SubscriptionsPageMainSlice;
export const { reducer: SubscriptionsPageMainReducer } = SubscriptionsPageMainSlice;
