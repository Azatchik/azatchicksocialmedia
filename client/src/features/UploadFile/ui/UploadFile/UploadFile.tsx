import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { memo, ReactNode, useMemo } from 'react';
import { Modal, ModalSizes } from 'shared/ui/Modal/Modal';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { Popup, PopupTheme } from 'shared/ui/Popup/Popup';
import { UploadFileAvatar } from '../UploadFileAvatar/UploadFileAvatar';
import { UploadFileHeader } from '../UploadFileHeader/UploadFileHeader';
import { getUploadFileServerErrors } from '../../model/selectors/getUploadFileServerErrors/getUploadFileServerErrors';
import cls from './UploadFile.module.scss';
import { UploadFileReducer } from '../../model/slices/UploadFileSlice';
import { UploadFileImage } from '../UploadFileImage/UploadFileImage';
import { UploadFileMusic } from '../UploadFileMusic/UploadFileMusic';

export enum UploadFileTypes {
    IMAGE = 'image',
    AVATAR = 'avatar',
    HEADER = 'header',
    MUSIC = 'music',
}

interface UploadFileProps {
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
    type: UploadFileTypes;
}

const reducers: ReducersList = {
    uploadFile: UploadFileReducer,
};

export const UploadFile = memo((props: UploadFileProps) => {
    const {
        className,
        isOpen,
        onClose,
        type,
    } = props;
    const { t } = useTranslation();
    const error = useSelector(getUploadFileServerErrors);

    const getContent = useMemo(() => {
        const content: ReactNode[] = [];
        // eslint-disable-next-line
        switch (type) {
        case UploadFileTypes.IMAGE:
            content.push(<UploadFileImage onClose={onClose} />);
            break;
        case UploadFileTypes.AVATAR:
            content.push(<UploadFileAvatar onClose={onClose} />);
            break;
        case UploadFileTypes.HEADER:
            content.push(<UploadFileHeader onClose={onClose} />);
            break;
        case UploadFileTypes.MUSIC:
            content.push(<UploadFileMusic onClose={onClose} />);
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
            size={ModalSizes.UPLOAD}
        >
            <DynamicModuleLoader reducers={reducers}>
                {getContent}
            </DynamicModuleLoader>
            <Popup
                isMessage={!!error}
                className={cls.popup}
                theme={PopupTheme.BLUE}
            >
                <Text
                    theme={TextTheme.WHITE}
                    size={TextSize.SSM}
                >
                    {error}
                </Text>
            </Popup>
        </Modal>
    );
});
