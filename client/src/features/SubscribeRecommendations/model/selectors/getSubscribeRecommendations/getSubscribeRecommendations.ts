import { StateSchema } from 'app/providers/StoreProvider';
import { ProfileRecommendationSchema } from 'entities/ProfileRecommendation';

export const getSubscribeRecommendationsMembers = (
    state: StateSchema,
) => state.subscribeRecommendations?.members ?? [] as ProfileRecommendationSchema[];
export const getSubscribeRecommendationsIsLoading = (state: StateSchema) => state.subscribeRecommendations?.isLoading ?? false;
export const getSubscribeRecommendationsError = (state: StateSchema) => state.subscribeRecommendations?.error ?? '';
