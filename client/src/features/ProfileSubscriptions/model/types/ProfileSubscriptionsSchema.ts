import { SubscriptionSchema } from 'entities/Subscription';

export interface ProfileSubscriptionsSchema {
    members?: SubscriptionSchema[];
    error?: string;
    isLoading: boolean;
}
