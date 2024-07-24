import { MusicSchema } from 'entities/Music';

export interface MusicRecommendationsSchema {
    isLoading: boolean;
    error?: string;
    data?: MusicSchema[];
    addedMusic: string[];
}
