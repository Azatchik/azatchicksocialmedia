import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardTheme } from 'shared/ui/Card/Card';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { Image } from 'shared/ui/Image/Image';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Icon, IconSizes, IconTheme } from 'shared/ui/Icon/Icon';
import cameraIcon from 'shared/assets/icons/camera.svg';
import pencilIcon from 'shared/assets/icons/pencil.svg';
import pictureIcon from 'shared/assets/icons/gallery.svg';
import trashCanIcon from 'shared/assets/icons/trash_can.svg';
import { Dropdown, DropdownItem } from 'shared/ui/Dropdown/Dropdown';
import { useHover } from 'shared/lib/hooks/useHover/useHover';
import { UploadFile, UploadFileTypes } from 'features/UploadFile';
import { useModal } from 'shared/lib/hooks/useModal/useModal';
import { getProfileData } from 'entities/Profile';
import { getEditProfileIsLoading } from 'pages/EditProfilePage';
import { DeleteFile, DeleteFileTypes } from 'features/DeleteFile';
import cls from './EditProfileHeader.module.scss';

interface EditProfileHeaderProps {
    className?: string;
}

export const EditProfileHeader = memo((props: EditProfileHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { theme } = useTheme();
    const profileData = useSelector(getProfileData);
    const isLoading = useSelector(getEditProfileIsLoading);
    const [avatarIsHover, bindAvatarHover] = useHover();
    const [headerIsHover, bindHeaderHover] = useHover();
    const [isOpenUploadAvatarModal, bindIsOpenUploadAvatarModal] = useModal();
    const [isOpenUploadHeaderModal, bindIsOpenUploadHeaderModal] = useModal();
    const [isOpenDeleteHeaderModal, bindIsOpenDeleteHeaderModal] = useModal();
    const [isOpenDeleteAvatarModal, bindIsOpenDeleteAvatarModal] = useModal();

    const onClickItemAvatarDropdown = useCallback((value: string) => {
        if (value === 'resetAvatar') {
            bindIsOpenUploadAvatarModal.onShowModal();
        }
        if (value === 'deleteAvatar') {
            bindIsOpenDeleteAvatarModal.onShowModal();
        }
    }, [bindIsOpenDeleteAvatarModal, bindIsOpenUploadAvatarModal]);

    const onClickItemHeaderDropdown = useCallback((value: string) => {
        if (value === 'resetHeader') {
            bindIsOpenUploadHeaderModal.onShowModal();
        }
        if (value === 'deleteHeader') {
            bindIsOpenDeleteHeaderModal.onShowModal();
        }
    }, [bindIsOpenDeleteHeaderModal, bindIsOpenUploadHeaderModal]);

    const avatarDropdownItems = useMemo<DropdownItem[]>(() => {
        const items: DropdownItem[] = [
            {
                value: 'resetAvatar',
                icon: pictureIcon,
                iconTheme: IconTheme.BLUE,
                text: t('Загрузить изображение'),
            },
        ];
        if (profileData.avatar) {
            items.push({
                value: 'deleteAvatar',
                icon: trashCanIcon,
                iconTheme: IconTheme.RED,
                text: t('Удалить'),
            });
        }

        return items;
    }, [profileData.avatar, t]);

    const editHeaderDropdownItems = useMemo<DropdownItem[]>(() => {
        const items: DropdownItem[] = [
            {
                value: 'resetHeader',
                icon: pictureIcon,
                iconTheme: IconTheme.BLUE,
                text: t('Сменить обложку'),
            },
        ];
        if (profileData.headerImg) {
            items.push({
                value: 'deleteHeader',
                icon: trashCanIcon,
                iconTheme: IconTheme.RED,
                text: t('Удалить'),
            });
        }

        return items;
    }, [profileData.headerImg, t]);

    if (isLoading) {
        return null;
    }

    return (
        <Card
            className={classNames(cls.EditProfileHeader, {}, [className])}
            theme={CardTheme.PANEL}
        >
            <UploadFile
                type={UploadFileTypes.HEADER}
                isOpen={isOpenUploadHeaderModal}
                onClose={bindIsOpenUploadHeaderModal.onCloseModal}
            />
            <UploadFile
                type={UploadFileTypes.AVATAR}
                isOpen={isOpenUploadAvatarModal}
                onClose={bindIsOpenUploadAvatarModal.onCloseModal}
            />
            <DeleteFile
                type={DeleteFileTypes.AVATAR}
                isOpen={isOpenDeleteAvatarModal}
                onClose={bindIsOpenDeleteAvatarModal.onCloseModal}
            />
            <DeleteFile
                type={DeleteFileTypes.HEADER}
                isOpen={isOpenDeleteHeaderModal}
                onClose={bindIsOpenDeleteHeaderModal.onCloseModal}
            />
            <HStack
                className={cls.title}
                maxW
                align="center"
            >
                <Text
                    theme={TextTheme.PRIMARY}
                    size={TextSize.SM}
                >
                    {t('Профиль')}
                </Text>
            </HStack>
            <div
                className={cls.parametersWrapper}
            >
                <HStack
                    className={cls.editHeaderWrapper}
                    {...bindHeaderHover}
                >
                    <HStack
                        gap="8"
                        align="center"
                        className={cls.editHeader}
                    >
                        <Icon
                            Svg={pencilIcon}
                            theme={IconTheme.SECONDARY}
                            size={IconSizes.SMALL}
                        />
                        <Text
                            theme={TextTheme.WHITE}
                            size={TextSize.SSM}
                            isBold
                        >
                            {t('Изменить обложку')}
                        </Text>
                    </HStack>
                    <Dropdown
                        items={editHeaderDropdownItems}
                        onClickItem={onClickItemHeaderDropdown}
                        isVisible={headerIsHover}
                        className={cls.headerDropdown}
                    />
                </HStack>
                <Image
                    src={profileData.headerImg
                        ? `${__API__}/static/profiles/${profileData.headerImg}`
                        : `${__API__}/static/defaults/${
                            theme === Theme.DARK
                                ? 'profile-header-dark.jpg'
                                : 'profile-header-light.jpg'
                        }`}
                    className={cls.headerImg}
                    height="57%"
                />
                <div
                    className={cls.avatarWrapper}
                    {...bindAvatarHover}
                >
                    <Dropdown
                        items={avatarDropdownItems}
                        onClickItem={onClickItemAvatarDropdown}
                        isVisible={avatarIsHover}
                        className={cls.avatarDropdown}
                    />
                    <Avatar
                        src={profileData.avatar
                            ? `${__API__}/static/profiles/${profileData.avatar}`
                            : `${__API__}/static/defaults/${
                                theme === Theme.DARK
                                    ? 'profile-avatar-dark.png'
                                    : 'profile-avatar-light.png'
                            }`}
                        size={130}
                    />
                    <Icon
                        Svg={cameraIcon}
                        size={IconSizes.LOWER_MEDIUM}
                        className={cls.avatarCameraIcon}
                        theme={IconTheme.SECONDARY}
                    />
                </div>
                <VStack
                    className={cls.parameters}
                >
                    <HStack
                        className={cls.fullName}
                        justify="end"
                        align="center"
                        gap="64"
                        maxW
                    >
                        <Text
                            size={TextSize.SM}
                            isBold
                            theme={TextTheme.PRIMARY}
                            className={cls.fullNameText}
                            ellipsis
                        >
                            {`${profileData.firstName} ${profileData.secondName}`}
                        </Text>
                        <Button
                            theme={ButtonTheme.CLEAN_BLUE}
                        >
                            {t('Изменить в настройках пользователя')}
                        </Button>
                    </HStack>
                    <HStack
                        className={cls.birthData}
                        justify="between"
                        align="center"
                        maxW
                    >
                        <Text
                            size={TextSize.SSM}
                            theme={TextTheme.GREY}
                        >
                            {t('Дата рождения')}
                        </Text>
                        <Text
                            size={TextSize.SSM}
                            theme={TextTheme.PRIMARY}
                            isBold
                            className={cls.birthDataNums}
                        >
                            {`${profileData.birthDay}.
                            ${profileData.birthMonth}.
                            ${profileData.birthYear}`}
                        </Text>
                        <Button
                            theme={ButtonTheme.CLEAN_BLUE}
                        >
                            {t('Изменить в настройках пользователя')}
                        </Button>
                    </HStack>
                </VStack>
            </div>
        </Card>
    );
});
