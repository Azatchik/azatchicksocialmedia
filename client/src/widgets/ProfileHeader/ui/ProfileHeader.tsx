import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
    memo, useCallback, useEffect, useState,
} from 'react';
import { Card, CardTheme } from 'shared/ui/Card/Card';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { useSelector } from 'react-redux';
import { getProfileData, getProfileErrors } from 'entities/Profile';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { HStack, VStack } from 'shared/ui/Stack';
import locationIcon from 'shared/assets/icons/location.svg';
import educationIcon from 'shared/assets/icons/education.svg';
import infoIcon from 'shared/assets/icons/info.svg';
import { Icon, IconSizes, IconTheme } from 'shared/ui/Icon/Icon';
import { Image } from 'shared/ui/Image/Image';
import { getUserProfileId } from 'entities/User';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { SubscribeToggle } from 'features/SubscribeToggle';
import { ProfileInfoModal } from 'widgets/ProfileInfoModal';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';
import cls from './ProfileHeader.module.scss';

interface ProfileHeaderProps {
    className?: string;
}

export const ProfileHeader = memo((props: ProfileHeaderProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation();
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const profileData = useSelector(getProfileData);
    const error = useSelector(getProfileErrors);
    const currentProfileId = useSelector(getUserProfileId);
    const [isOpenedProfileInfoModal, setIsOpenedProfileInfoModal] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const originalTitle = document.title;
        if (profileData.firstName) {
            document.title = `${profileData.firstName} ${profileData.secondName}`;
        } else if (error) {
            document.title = error;
        }

        return () => {
            document.title = originalTitle;
        };
    }, [error, profileData.firstName, profileData.secondName]);

    const onShowProfileInfoModal = useCallback(() => {
        setIsOpenedProfileInfoModal(true);
    }, []);

    const onCloseProfileInfoModal = useCallback(() => {
        setIsOpenedProfileInfoModal(false);
    }, []);

    return (
        <Card
            className={classNames(cls.ProfileHeader, {}, [className])}
            theme={CardTheme.PANEL}
        >
            <Image
                src={profileData.headerImg
                    ? `${__API__}/static/profiles/${profileData.headerImg}`
                    : `${__API__}/static/defaults/${
                        theme === Theme.DARK
                            ? 'profile-header-dark.jpg'
                            : 'profile-header-light.jpg'
                    }`}
                height="62%"
            />
            <HStack className={cls.infoBlock}>
                <VStack
                    gap="8"
                    align="start"
                    className={cls.mainInfo}
                >
                    {profileData.firstName
                        ? (
                            <Text
                                size={TextSize.ML}
                                theme={TextTheme.PRIMARY}
                            >
                                {`${profileData.firstName} ${profileData.secondName}`}
                            </Text>
                        )
                        : (
                            <Text
                                size={TextSize.SM}
                                theme={TextTheme.GREY}
                            >
                                {error}
                            </Text>
                        )}
                    {profileData.lifeStatus && (
                        <Text
                            size={TextSize.S}
                            theme={TextTheme.PRIMARY}
                        >
                            {profileData.lifeStatus}
                        </Text>
                    )}
                    <HStack
                        className={cls.lifeInfo}
                        gap="16"
                    >
                        {profileData.city && (
                            <Text
                                size={TextSize.SSM}
                                theme={TextTheme.GREY}
                                icon={locationIcon}
                                iconSize={IconSizes.SMALL}
                                className={cls.city}
                                noWrap
                            >
                                {profileData.city}
                            </Text>
                        )}
                        {profileData.education && (
                            <Text
                                size={TextSize.SSM}
                                theme={TextTheme.GREY}
                                icon={educationIcon}
                                iconSize={IconSizes.SMALL}
                                className={cls.education}
                                noWrap
                            >
                                {profileData.education}
                            </Text>
                        )}
                        {profileData.id && (
                            <HStack
                                align="center"
                                gap="4"
                            >
                                <Icon
                                    Svg={infoIcon}
                                    size={IconSizes.SMALL}
                                    theme={IconTheme.GREY}
                                />
                                <Button
                                    theme={ButtonTheme.CLEAN_GREY}
                                    onClick={onShowProfileInfoModal}
                                >
                                    {t('Подробнее')}
                                </Button>
                                <ProfileInfoModal
                                    isOpen={isOpenedProfileInfoModal}
                                    onClose={onCloseProfileInfoModal}
                                />
                            </HStack>
                        )}
                    </HStack>
                </VStack>
                {currentProfileId !== profileData.id && !error
                    ? (
                        <VStack
                            className={cls.headerBtns}
                            gap="16"
                        >
                            <SubscribeToggle />
                            <Button
                                theme={ButtonTheme.PRIMARY_BLACK}
                                isSmall
                            >
                                {t('Сообщение')}
                            </Button>
                        </VStack>
                    )
                    : !error && (
                        <Button
                            theme={ButtonTheme.SECONDARY}
                            isMedium
                            className={cls.editProfileBtn}
                            onClick={() => navigate(RoutePath.edit_profile)}
                        >
                            {t('Редактировать профиль')}
                        </Button>
                    )}
            </HStack>
            <Avatar
                src={profileData.avatar
                    ? `${__API__}/static/profiles/${profileData.avatar}`
                    : `${__API__}/static/defaults/${
                        theme === Theme.DARK
                            ? 'profile-avatar-dark.png'
                            : 'profile-avatar-light.png'
                    }`}
                className={cls.avatarImg}
                size={200}
            />
        </Card>
    );
});
