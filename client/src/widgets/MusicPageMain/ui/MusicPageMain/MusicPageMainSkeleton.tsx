import React from 'react';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { HStack, VStack } from 'shared/ui/Stack';

export const MusicPageMainSkeleton = () => {
    return (
        <VStack
            gap="16"
            align="center"
            maxW
        >
            <HStack
                gap="8"
                maxW
            >
                <Skeleton width={110} height={35} border="8px" />
                <Skeleton width={110} height={35} border="8px" />
            </HStack>
            <VStack
                gap="8"
                align="center"
                maxW
            >
                <Skeleton width="100%" height={50} border="12px" />
                <Skeleton width="100%" height={50} border="12px" />
                <Skeleton width="100%" height={50} border="12px" />
                <Skeleton width="100%" height={50} border="12px" />
            </VStack>
        </VStack>
    );
};
