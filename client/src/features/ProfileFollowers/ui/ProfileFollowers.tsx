import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useEffect, useMemo } from 'react';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Card, CardTheme } from 'shared/ui/Card/Card';
import { HStack, VStack } from 'shared/ui/Stack';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getProfileData } from 'entities/Profile';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { AppLink, AppLinkSizes, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { FollowerСircle } from 'entities/Follower';
import { Loader } from 'shared/ui/Loader/Loader';
import { useParams } from 'react-router-dom';
import { fetchFollowers } from '../model/services/fetchSubscriptions/fetchFollowers';
import cls from './ProfileFollowers.module.scss';
import { ProfileFollowersReducer } from '../model/slices/ProfileFollowersSlice';
import {
    getProfileFollowersIsLoading,
    getProfileFollowersMembers,
} from '../model/selectors/getProfileFollowers/getProfileFollowers';

interface ProfileFollowersProps {
    className?: string;
}

const reducers: ReducersList = {
    profileFollowers: ProfileFollowersReducer,
};

export const ProfileFollowers = memo((props: ProfileFollowersProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const followersMembers = useSelector(getProfileFollowersMembers);
    const profileData = useSelector(getProfileData);
    const isLoading = useSelector(getProfileFollowersIsLoading);

    useEffect(() => {
        if (profileData.followers.length && id) {
            dispatch(fetchFollowers(id));
        }
    }, [dispatch, profileData.followers.length, id]);

    let content;

    const getContent = () => {
        if (isLoading) {
            content = (
                <VStack
                    maxW
                    align="center"
                    gap="32"
                >
                    <Loader />
                </VStack>
            );
        } else if (!followersMembers.length) {
            content = (
                <VStack
                    maxW
                    align="center"
                    gap="32"
                >
                    <HStack
                        maxW
                        justify="start"
                    >
                        <AppLink
                            theme={AppLinkTheme.UNTHEME}
                            size={AppLinkSizes.SMALL}
                            isBold
                            to="#"
                            className={cls.followersLength}
                        >
                            {t('Подписчики')}
                        </AppLink>
                    </HStack>
                    <Text
                        size={TextSize.SSM}
                        theme={TextTheme.GREY}
                    >
                        {t('Нет подписчиков')}
                    </Text>
                </VStack>
            );
        } else {
            content = (
                <VStack>
                    <HStack
                        gap="4"
                        justify="start"
                        align="start"
                    >
                        <AppLink
                            theme={AppLinkTheme.UNTHEME}
                            size={AppLinkSizes.SMALL}
                            isBold
                            to={RoutePath.followers.replace(':id', profileData.id || ':id')}
                            className={cls.followersLength}
                        >
                            {t('Подписчики')}
                        </AppLink>
                        <Text
                            theme={TextTheme.GREY}
                            size={TextSize.SSM}
                            isBold
                        >
                            {profileData.followers.length.toString()}
                        </Text>
                    </HStack>
                    <HStack
                        justify="start"
                        align="center"
                        gap="4"
                        className={cls.followers}
                    >
                        {followersMembers.map((follower, index) => (
                            <FollowerСircle
                                follower={follower}
                                key={index}
                            />
                        ))}
                    </HStack>
                </VStack>
            );
        }
        return content;
    };

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Card
                className={classNames(cls.ProfileFollowers, {}, [className])}
                theme={CardTheme.PANEL}
            >
                {getContent()}
            </Card>
        </DynamicModuleLoader>
    );
});
