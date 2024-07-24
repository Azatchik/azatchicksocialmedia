import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
    CSSProperties, memo, useCallback, useState,
} from 'react';
import { Image } from 'shared/ui/Image/Image';
import { HStack, VStack } from 'shared/ui/Stack';
import { useSelector } from 'react-redux';
import { getProfileData } from 'entities/Profile';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { getUserProfileId } from 'entities/User';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { CatalogTypes, MediaActions } from 'entities/Media';
import { UploadFile, UploadFileTypes } from 'features/UploadFile';
import cls from './ProfileMediaImages.module.scss';
import ImagesModal from '../ImagesModal/ImagesModal';

interface ProfileMediaImagesProps {
    className?: string;
}

export const ProfileMediaImages = memo((props: ProfileMediaImagesProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const profileData = useSelector(getProfileData);
    const currentProfileId = useSelector(getUserProfileId);
    const [isOpenImagesModal, setIsOpenImagesModal] = useState<boolean>(false);
    const [isOpenUploadImageModal, setIsOpenUploadImageModal] = useState<boolean>(false);

    const onShowImagesModal = useCallback(() => {
        setIsOpenImagesModal(true);
    }, []);

    const onCloseImagesModal = useCallback(() => {
        setIsOpenImagesModal(false);
    }, []);

    const onShowUploadImageModal = useCallback(() => {
        setIsOpenUploadImageModal(true);
    }, []);

    const onCloseUploadImageModal = useCallback(() => {
        setIsOpenUploadImageModal(false);
    }, []);

    const onImageClick = useCallback((index: number) => {
        dispatch(MediaActions.setCatalogMedia(CatalogTypes.PROFILES));
        dispatch(MediaActions.setArrayMedia(profileData.images));
        dispatch(MediaActions.setIndexMedia(index));
        dispatch(MediaActions.setSelectedMedia());
        dispatch(MediaActions.openMedia());
    }, [dispatch, profileData.images]);

    const additionalStyleGallary = (index: number): CSSProperties => {
        switch (index) {
        case 0:
            if (profileData.images.length === 1) {
                return { borderRadius: '12px' };
            }
            if (profileData.images.length === 2 || profileData.images.length === 3) {
                return {
                    borderTopLeftRadius: '12px',
                    borderBottomLeftRadius: '12px',
                };
            }
            return { borderTopLeftRadius: '12px' };
        case 1:
            if (profileData.images.length === 2) {
                return {
                    borderTopRightRadius: '12px',
                    borderBottomRightRadius: '12px',
                };
            }
            return {};
        case 2:
            if (profileData.images.length === 3
                || profileData.images.length === 4
                || profileData.images.length === 5) {
                return {
                    borderTopRightRadius: '12px',
                    borderBottomRightRadius: '12px',
                };
            }
            return { borderTopRightRadius: '12px' };
        case 3:
            if (profileData.images.length === 4) {
                return {
                    borderBottomRightRadius: '12px',
                    borderBottomLeftRadius: '12px',
                };
            }
            return { borderBottomLeftRadius: '12px' };
        case 4:
            if (profileData.images.length === 5) {
                return {
                    borderBottomRightRadius: '12px',
                };
            }
            return {};
        case 5:
            return { borderBottomRightRadius: '12px' };
        default:
            return {};
        }
    };

    if (!profileData.images?.length && profileData.id === currentProfileId) {
        return (
            <VStack
                align="center"
                gap="8"
                maxW
                className={cls.imagesNotFound}
            >
                <Text
                    size={TextSize.SSM}
                    theme={TextTheme.GREY}
                >
                    {t('Вы еще не добавили ни одну фотографию')}
                </Text>
                <Button
                    theme={ButtonTheme.SECONDARY}
                    isSmall
                    onClick={onShowUploadImageModal}
                >
                    {t('Добавить')}
                </Button>
                <UploadFile
                    isOpen={isOpenUploadImageModal}
                    onClose={onCloseUploadImageModal}
                    type={UploadFileTypes.IMAGE}
                />
            </VStack>
        );
    }

    if (!profileData.images.length) {
        return (
            <HStack
                justify="center"
                maxW
                className={cls.imagesNotFound}
            >
                <Text
                    size={TextSize.SSM}
                    theme={TextTheme.GREY}
                >
                    {t('Этот пользователь пока не добавил ни одну фотографию')}
                </Text>
            </HStack>
        );
    }

    return (
        <VStack
            gap="16"
            maxW
            className={classNames(cls.ProfileMediaImages, {}, [className])}
        >
            <HStack
                gap="4"
                className={cls.imgStack}
            >
                {profileData.images.slice(0, 6).map((img, index) => (
                    <Image
                        key={img}
                        width={185}
                        height={185}
                        src={`${__API__}/static/profiles/${img}`}
                        className={cls.imgItem}
                        onClick={() => onImageClick(index)}
                        style={additionalStyleGallary(index)}
                    />
                ))}
            </HStack>
            <HStack
                maxW
                justify="center"
                gap="16"
            >
                <Button
                    theme={ButtonTheme.SECONDARY_BLACK}
                    isSmall={profileData.id === currentProfileId}
                    isMedium={profileData.id !== currentProfileId}
                    onClick={onShowImagesModal}
                >
                    {t('Показать все')}
                </Button>
                {profileData.id === currentProfileId && (
                    <Button
                        theme={ButtonTheme.SECONDARY}
                        isSmall
                        onClick={onShowUploadImageModal}
                    >
                        {t('Добавить')}
                    </Button>
                )}
            </HStack>
            <ImagesModal isOpen={isOpenImagesModal} onClose={onCloseImagesModal} />
            <UploadFile
                isOpen={isOpenUploadImageModal}
                onClose={onCloseUploadImageModal}
                type={UploadFileTypes.IMAGE}
            />
        </VStack>
    );
});
