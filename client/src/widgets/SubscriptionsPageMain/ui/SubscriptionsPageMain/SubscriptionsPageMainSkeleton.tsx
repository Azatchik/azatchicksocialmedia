import React from 'react';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { HStack, VStack } from 'shared/ui/Stack';

export const SubscriptionsPageMainSkeleton = () => {
    return (
        <VStack
            gap="16"
        >
            <HStack
                gap="4"
                justify="start"
                align="start"
            >
                <Skeleton width={130} height={20} border="12px" />
            </HStack>
            {new Array(7).fill(0).map((item) => (
                <HStack
                    gap="16"
                >
                    <Skeleton width={60} height={60} border="50%" />
                    <VStack
                        gap="8"
                    >
                        <Skeleton width={150} height={20} border="12px" />
                        <Skeleton width={80} height={20} border="12px" />
                    </VStack>
                </HStack>
            ))}
        </VStack>
    );
};
