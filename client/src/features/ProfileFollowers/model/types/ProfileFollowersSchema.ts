import { FollowerSchema } from 'entities/Follower';

export interface ProfileFollowersSchema {
    members?: FollowerSchema[];
    error?: string;
    isLoading: boolean;
}
