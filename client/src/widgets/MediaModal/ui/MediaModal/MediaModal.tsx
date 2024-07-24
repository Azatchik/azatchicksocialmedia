import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { Modal, ModalSizes } from 'shared/ui/Modal/Modal';
import { useSelector } from 'react-redux';
import {
    getMediaArray,
    getMediaCatalog,
    getMediaDeletedArray,
    getMediaIndex,
    getMediaIsOpen,
    getMediaSelectedMedia,
    MediaActions,
} from 'entities/Media';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Image } from 'shared/ui/Image/Image';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import arrowRigthIcon from 'shared/assets/icons/arrow-right.svg';
import arrowLeftIcon from 'shared/assets/icons/arrow-left.svg';
import { Icon, IconSizes, IconTheme } from 'shared/ui/Icon/Icon';
import { ProfileActions } from 'entities/Profile';
import { MediaModalFooter } from '../MediaModalFooter/MediaModalFooter';
import {
    fetchClearDeletedProfileImages,
} from '../../model/services/fetchClearDeletedProfileImages/fetchClearDeletedProfileImages';
import cls from './MediaModal.module.scss';

interface MediaModalProps {
    className?: string;
}

export const MediaModal = memo((props: MediaModalProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isOpen = useSelector(getMediaIsOpen);
    const selectedMedia = useSelector(getMediaSelectedMedia);
    const catalog = useSelector(getMediaCatalog);
    const currentIndexMedia = useSelector(getMediaIndex);
    const arrayMedia = useSelector(getMediaArray);
    const arrayDeletedMedia = useSelector(getMediaDeletedArray);

    const onClose = useCallback(() => {
        if (arrayDeletedMedia.length && catalog) {
            dispatch(fetchClearDeletedProfileImages());
            dispatch(MediaActions.initArrayDeletedMedia());
            dispatch(ProfileActions.clearDeletedImages(arrayDeletedMedia));
            dispatch(MediaActions.clearArrayDeletedMedia());
        }
        dispatch(MediaActions.closeMedia());
    }, [arrayDeletedMedia, catalog, dispatch]);

    const onNextMedia = useCallback(() => {
        dispatch(MediaActions.setIndexMedia(currentIndexMedia + 1));
        dispatch(MediaActions.setSelectedMedia());
    }, [currentIndexMedia, dispatch]);

    const onPrevMedia = useCallback(() => {
        dispatch(MediaActions.setIndexMedia(currentIndexMedia - 1));
        dispatch(MediaActions.setSelectedMedia());
    }, [currentIndexMedia, dispatch]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className={classNames(cls.MediaModal, {}, [className])}
            isPanel
            lazy
            size={ModalSizes.MEDIA}
        >
            {currentIndexMedia > 0 && (
                <Button
                    theme={ButtonTheme.CLEAN}
                    onClick={onPrevMedia}
                    isHigh
                    className={cls.leftArrow}
                >
                    <Icon
                        Svg={arrowLeftIcon}
                        size={IconSizes.MEDIUM}
                        theme={IconTheme.PANEL}
                    />
                </Button>
            )}
            <Image
                src={`${__API__}/static/${catalog}/${selectedMedia}`}
                className={cls.img}
                height={600}
                defaultSize
                isDeleted={arrayDeletedMedia.includes(selectedMedia)}
            />
            {arrayMedia.length !== currentIndexMedia + 1 && (
                <Button
                    theme={ButtonTheme.CLEAN}
                    onClick={onNextMedia}
                    isHigh
                    className={cls.rightArrow}
                >
                    <Icon
                        Svg={arrowRigthIcon}
                        size={IconSizes.MEDIUM}
                        theme={IconTheme.PANEL}
                    />
                </Button>
            )}
            <MediaModalFooter />
        </Modal>
    );
});
