import { ProfileRecommendationSchema } from 'entities/ProfileRecommendation';

export interface SubscribeRecommendationsSchema {
    members?: ProfileRecommendationSchema[];
    error?: string;
    isLoading: boolean;
}
