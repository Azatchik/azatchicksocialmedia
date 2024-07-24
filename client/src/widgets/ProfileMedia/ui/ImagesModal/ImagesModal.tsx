import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Modal, ModalSizes } from 'shared/ui/Modal/Modal';
import { useSelector } from 'react-redux';
import { getProfileData } from 'entities/Profile';
import { Image } from 'shared/ui/Image/Image';
import { HStack } from 'shared/ui/Stack';
import { CatalogTypes, MediaActions } from 'entities/Media';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './ImagesModal.module.scss';

interface ImagesModalProps {
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
}

const ImagesModal = memo((props: ImagesModalProps) => {
    const { className, isOpen, onClose } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const profileData = useSelector(getProfileData);

    const onImageClick = useCallback((index: number) => {
        dispatch(MediaActions.setCatalogMedia(CatalogTypes.PROFILES));
        dispatch(MediaActions.setArrayMedia(profileData.images));
        dispatch(MediaActions.setIndexMedia(index));
        dispatch(MediaActions.setSelectedMedia());
        dispatch(MediaActions.openMedia());
    }, [dispatch, profileData.images]);

    return (
        <Modal
            className={classNames(cls.ImagesModal, {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
            isPanel
            size={ModalSizes.GALLERY}
            lazy
        >
            <HStack
                gap="8"
                className={cls.imgStack}
                align="start"
            >
                {profileData.images.map((img, index) => (
                    <Image
                        key={img}
                        width={210}
                        height={295}
                        src={`${__API__}/static/profiles/${img}`}
                        className={cls.imgItem}
                        onClick={() => onImageClick(index)}
                    />
                ))}
            </HStack>
        </Modal>
    );
});

export default ImagesModal;
