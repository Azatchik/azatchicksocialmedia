import React from 'react';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { HStack, VStack } from 'shared/ui/Stack';

export const MusicRecommendationsSkeleton = () => {
    return (
        <VStack
            gap="32"
            align="center"
            style={{ position: 'absolute', top: '20px', left: '25px' }}
        >
            <HStack
                maxW
            >
                <Skeleton width={150} height={25} border="8px" />
            </HStack>
            <VStack
                gap="16"
                align="center"
                maxW
            >
                <HStack
                    gap="20"
                    maxW
                    justify="center"
                >
                    <Skeleton width={220} height={50} border="12px" />
                    <Skeleton width={220} height={50} border="12px" />
                    <Skeleton width={220} height={50} border="12px" />
                </HStack>
                <HStack
                    gap="20"
                    maxW
                    justify="center"
                >
                    <Skeleton width={220} height={50} border="12px" />
                    <Skeleton width={220} height={50} border="12px" />
                    <Skeleton width={220} height={50} border="12px" />
                </HStack>
                <HStack
                    gap="20"
                    maxW
                    justify="center"
                >
                    <Skeleton width={220} height={50} border="12px" />
                    <Skeleton width={220} height={50} border="12px" />
                    <Skeleton width={220} height={50} border="12px" />
                </HStack>
            </VStack>
        </VStack>
    );
};
