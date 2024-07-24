import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useEffect } from 'react';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Card, CardTheme } from 'shared/ui/Card/Card';
import { HStack, VStack } from 'shared/ui/Stack';
import { useSelector } from 'react-redux';
import { Subscription } from 'entities/Subscription';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getProfileData } from 'entities/Profile';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { AppLink, AppLinkSizes, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useParams } from 'react-router-dom';
import { Loader } from 'shared/ui/Loader/Loader';
import { fetchSubscriptions } from '../model/services/fetchSubscriptions/fetchSubscriptions';
import {
    getProfileSubscriptionsIsLoading,
    getProfileSubscriptionsMembers,
} from '../model/selectors/getProfileSubscriptions/getProfileSubscriptions';
import cls from './ProfileSubscriptions.module.scss';
import { ProfileSubscriptionsReducer } from '../model/slices/ProfileSubscriptionsSlice';

interface ProfileSubscriptionsProps {
    className?: string;
}

const reducers: ReducersList = {
    profileSubscriptions: ProfileSubscriptionsReducer,
};

export const ProfileSubscriptions = memo((props: ProfileSubscriptionsProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const subscriptionsMembers = useSelector(getProfileSubscriptionsMembers);
    const profileData = useSelector(getProfileData);
    const isLoading = useSelector(getProfileSubscriptionsIsLoading);

    useEffect(() => {
        if (profileData.subscriptions.length && id) {
            dispatch(fetchSubscriptions(id));
        }
    }, [dispatch, profileData.subscriptions.length, id]);

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
        } else if (!subscriptionsMembers.length) {
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
                            className={cls.subscriptionsLength}
                        >
                            {t('Подписки')}
                        </AppLink>
                    </HStack>
                    <Text
                        size={TextSize.SSM}
                        theme={TextTheme.GREY}
                    >
                        {t('Нет подписок')}
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
                            to={RoutePath.subscriptions.replace(':id', profileData.id || ':id')}
                            className={cls.subscriptionsLength}
                        >
                            {t('Подписки')}
                        </AppLink>
                        <Text
                            theme={TextTheme.GREY}
                            size={TextSize.SSM}
                            isBold
                        >
                            {profileData.subscriptions.length.toString()}
                        </Text>
                    </HStack>
                    {subscriptionsMembers.map((subscription, index) => (
                        <Subscription
                            subscription={subscription}
                            key={index}
                            className={cls.itemList}
                        />
                    ))}
                </VStack>
            );
        }
        return content;
    };

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Card
                className={classNames(cls.ProfileSubscriptions, {}, [className])}
                theme={CardTheme.PANEL}
            >
                {getContent()}
            </Card>
        </DynamicModuleLoader>
    );
});
