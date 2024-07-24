import { EntityState } from '@reduxjs/toolkit';
import { FollowerSchema } from 'entities/Follower';

export interface FollowersPageMainSchema extends EntityState<FollowerSchema>{
    isLoading: boolean;
    error?: string;
}
