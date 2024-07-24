import { EntityState } from '@reduxjs/toolkit';
import { MusicSchema } from 'entities/Music';

export interface MusicPageMainMyMusicSchema extends EntityState<MusicSchema>{
    isLoading: boolean;
    isLoadingNext: boolean;
    error?: string;
    page: number;
    hasMore: boolean;
    currentProfileMusic: string[];
    profileId: string;
}
