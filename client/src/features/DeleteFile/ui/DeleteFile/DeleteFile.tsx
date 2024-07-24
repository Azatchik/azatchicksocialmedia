import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { memo, ReactNode, useMemo } from 'react';
import { Modal, ModalSizes } from 'shared/ui/Modal/Modal';
import cls from './DeleteFile.module.scss';
import { DeleteFileHeader } from '../DeleteFileHeader/DeleteFileHeader';
import { DeleteFileAvatar } from '../DeleteFileAvatar/DeleteFileAvatar';

export enum DeleteFileTypes {
    HEADER = 'header',
    AVATAR = 'avatar',
}

interface DeleteFileProps {
    className?: string;
    type: DeleteFileTypes;
    onClose: () => void;
    isOpen?: boolean;
}

export const DeleteFile = memo((props: DeleteFileProps) => {
    const {
        className,
        isOpen,
        onClose,
        type,
    } = props;
    const { t } = useTranslation();

    const getContent = useMemo(() => {
        const content: ReactNode[] = [];
        // eslint-disable-next-line
        switch (type) {
        case DeleteFileTypes.AVATAR:
            content.push(<DeleteFileAvatar onClose={onClose} />);
            break;
        case DeleteFileTypes.HEADER:
            content.push(<DeleteFileHeader onClose={onClose} />);
            break;
        }

        return content;
    }, [onClose, type]);

    return (
        <Modal
            className={classNames(cls.UploadImage, {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
            isPanel
            lazy
            size={ModalSizes.DELETE}
        >
            {getContent}
        </Modal>
    );
});
