import { useCallback, useMemo, useState } from 'react';

interface UseModalBind {
    onShowModal: () => void;
    onCloseModal: () => void;
}

type UseModalResult = [boolean, UseModalBind]

export const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onShowModal = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    return useMemo<UseModalResult>(() => [
        isOpen,
        { onShowModal, onCloseModal },
    ], [isOpen, onShowModal, onCloseModal]);
};
