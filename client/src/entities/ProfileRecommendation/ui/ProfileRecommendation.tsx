import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { AppLink, AppLinkSizes, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { SubscriptionsPageMainActions } from 'widgets/SubscriptionsPageMain';
import { SubscriptionSchema } from 'entities/Subscription';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserProfileId } from 'entities/User';
import { ProfileRecommendationSchema } from '../model/types/ProfileRecommendationSchema';
import cls from './ProfileRecommendation.module.scss';
import { fetchSubscribe } from '../model/services/fetchSubscribe/fetchSubscribe';
import { fetchUnsubscribe } from '../model/services/fetchUnSubscribe/fetchUnSubscribe';

interface ProfileRecommendationProps {
    className?: string;
    profileRecommendation: ProfileRecommendationSchema;
}

export const ProfileRecommendation = memo((props: ProfileRecommendationProps) => {
    const { className, profileRecommendation } = props;
    const { t } = useTranslation();
    const { theme } = useTheme();
    const { id } = useParams();
    const userProfileId = useSelector(getUserProfileId);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const onSubscribeClick = useCallback(async (e: React.MouseEvent) => {
        e.stopPropagation();
        const result = await dispatch(fetchSubscribe(profileRecommendation.id));
        if (result.meta.requestStatus === 'fulfilled') {
            if (id === userProfileId) {
                dispatch(SubscriptionsPageMainActions.addSubscription(profileRecommendation));
            }
            setIsSubscribed(true);
        }
    }, [dispatch, id, profileRecommendation, userProfileId]);

    const onUnSubscribeClick = useCallback(async (e: React.MouseEvent) => {
        e.stopPropagation();
        const result = await dispatch(fetchUnsubscribe(profileRecommendation.id));
        if (result.meta.requestStatus === 'fulfilled') {
            if (id === userProfileId) {
                dispatch(SubscriptionsPageMainActions.removeSubscription(profileRecommendation.id));
            }
            setIsSubscribed(false);
        }
    }, [dispatch, id, profileRecommendation.id, userProfileId]);

    return (
        <HStack
            className={classNames(cls.ProfileRecommendation, {}, [className])}
        >
            <HStack
                justify="start"
                align="center"
                gap="8"
                maxW
            >
                <AppLink
                    theme={AppLinkTheme.UNTHEME}
                    size={AppLinkSizes.SMALL}
                    to={RoutePath.profile + profileRecommendation.id}
                >
                    <Avatar
                        src={profileRecommendation.avatar
                            ? `${__API__}/static/profiles/${profileRecommendation.avatar}`
                            : `${__API__}/static/defaults/${
                                theme === Theme.DARK
                                    ? 'profile-avatar-dark.png'
                                    : 'profile-avatar-light.png'
                            }`}
                        size={60}
                    />
                </AppLink>
                <VStack
                    justify="center"
                    align="start"
                    className={cls.infoWrapper}
                >
                    <AppLink
                        theme={AppLinkTheme.UNTHEME}
                        size={AppLinkSizes.SMALL}
                        to={RoutePath.profile + profileRecommendation.id}
                        className={cls.fullName}
                    >
                        {`${profileRecommendation.firstName} ${profileRecommendation.secondName}`}
                    </AppLink>
                    <Text
                        size={TextSize.S}
                        theme={TextTheme.GREY}
                        className={cls.city}
                        noWrap
                    >
                        {profileRecommendation.city}
                    </Text>
                </VStack>
                {isSubscribed
                    ? (
                        <Button
                            theme={ButtonTheme.SECONDARY_BLACK}
                            isShallow
                            onClick={onUnSubscribeClick}
                        >
                            {t('Отписаться')}
                        </Button>
                    )
                    : (
                        <Button
                            theme={ButtonTheme.PRIMARY_BLACK}
                            isShallow
                            onClick={onSubscribeClick}
                        >
                            {t('Подписаться')}
                        </Button>
                    )}
            </HStack>
        </HStack>
    );
});
