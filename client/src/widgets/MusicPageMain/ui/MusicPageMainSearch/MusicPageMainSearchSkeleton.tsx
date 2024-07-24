import React from 'react';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { HStack, VStack } from 'shared/ui/Stack';

export const MusicPageMainSearchSkeleton = () => {
    return (
        <>
            {new Array(4).fill(0).map(() => <Skeleton width="100%" height={50} border="12px" />)}
        </>
    );
};
