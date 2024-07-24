import { EntityState } from '@reduxjs/toolkit';
import { MusicSchema } from 'entities/Music';

export interface MusicPageMainSearchSchema extends EntityState<MusicSchema>{
    isLoading: boolean;
    error?: string;
    query: string;
}
