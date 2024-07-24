import { StateSchema } from 'app/providers/StoreProvider';
import { MusicSchema } from 'entities/Music';

export const getMusicRecommendationsIsLoading = (state: StateSchema) => state.musicRecommendations?.isLoading ?? false;
export const getMusicRecommendationsError = (state: StateSchema) => state.musicRecommendations?.error ?? '';
export const getMusicRecommendationsData = (state: StateSchema) => state.musicRecommendations?.data ?? [] as MusicSchema[];
export const getMusicRecommendationsAddedMusic = (state: StateSchema) => state.musicRecommendations?.addedMusic ?? [];
