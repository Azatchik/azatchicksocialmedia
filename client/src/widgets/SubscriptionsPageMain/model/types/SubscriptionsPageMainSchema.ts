import { EntityState } from '@reduxjs/toolkit';
import { SubscriptionSchema } from 'entities/Subscription';

export interface SubscriptionsPageMainSchema extends EntityState<SubscriptionSchema>{
    isLoading: boolean;
    error?: string;
}
