import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { SubscriptionSchema } from '../model/types/SubscriptionSchema';
import cls from './Subscription.module.scss';

interface SubscriptionProps {
    className?: string;
    subscription: SubscriptionSchema;
}

export const Subscription = memo((props: SubscriptionProps) => {
    const { className, subscription } = props;
    const { t } = useTranslation();
    const { theme } = useTheme();

    return (
        <AppLink
            to={RoutePath.profile + subscription.profileId}
            theme={AppLinkTheme.PANEL}
            className={classNames(cls.Subscription, {}, [className])}
        >
            <HStack
                justify="start"
                align="center"
                gap="8"
                className={cls.contentWrapper}
            >
                <Avatar
                    src={subscription.avatar
                        ? `${__API__}/static/profiles/${subscription.avatar}`
                        : `${__API__}/static/defaults/${
                            theme === Theme.DARK
                                ? 'profile-avatar-dark.png'
                                : 'profile-avatar-light.png'
                        }`}
                    size={60}
                />
                <VStack
                    justify="center"
                    align="start"
                    className={cls.infoWrapper}
                >
                    <Text
                        size={TextSize.SSM}
                        theme={TextTheme.PRIMARY}
                        className={cls.fullName}
                        noWrap
                    >
                        {`${subscription.firstName} ${subscription.secondName}`}
                    </Text>
                    <Text
                        size={TextSize.S}
                        theme={TextTheme.GREY}
                        className={cls.city}
                        noWrap
                    >
                        {subscription.city}
                    </Text>
                </VStack>
            </HStack>
        </AppLink>
    );
});
