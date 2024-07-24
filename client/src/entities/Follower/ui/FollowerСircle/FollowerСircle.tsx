import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { FollowerSchema } from '../../model/types/FollowerSchema';
import cls from './FollowerСircle.module.scss';

interface FollowerСircleProps {
    className?: string;
    follower: FollowerSchema;
}

export const FollowerСircle = memo((props: FollowerСircleProps) => {
    const { className, follower } = props;
    const { t } = useTranslation();
    const { theme } = useTheme();

    return (
        <AppLink
            to={RoutePath.profile + follower.profileId}
            theme={AppLinkTheme.PANEL}
            className={classNames(cls.FollowerСircle, {}, [className])}
        >
            <VStack
                justify="center"
                align="center"
                gap="4"
            >
                <Avatar
                    src={follower.avatar
                        ? `${__API__}/static/profiles/${follower.avatar}`
                        : `${__API__}/static/defaults/${
                            theme === Theme.DARK
                                ? 'profile-avatar-dark.png'
                                : 'profile-avatar-light.png'
                        }`}
                    size={70}
                />
                <Text
                    size={TextSize.SSM}
                    theme={TextTheme.PRIMARY}
                    className={cls.firstName}
                    align={TextAlign.CENTER}
                    noWrap
                >
                    {follower.firstName}
                </Text>
            </VStack>
        </AppLink>
    );
});
