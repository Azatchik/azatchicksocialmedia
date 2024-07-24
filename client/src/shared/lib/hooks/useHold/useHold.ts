import { useCallback, useMemo, useState } from 'react';

interface UseHoldBind {
    onMouseDown: () => void;
    onMouseUp: () => void;
}

type UseHoldResult = [boolean, UseHoldBind]

export const useHold = () => {
    const [isHold, setIsHold] = useState(false);

    const onMouseDown = useCallback(() => {
        setIsHold(true);
    }, []);

    const onMouseUp = useCallback(() => {
        setIsHold(false);
    }, []);

    return useMemo(() => [
        isHold,
        { onMouseDown, onMouseUp },
    ], [isHold, onMouseDown, onMouseUp]);
};
