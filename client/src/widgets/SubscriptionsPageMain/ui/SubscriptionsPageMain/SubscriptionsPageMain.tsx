import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useEffect } from 'react';
import { Card, CardTheme } from 'shared/ui/Card/Card';
import { VStack } from 'shared/ui/Stack';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserProfileId } from 'entities/User';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Subscription } from 'entities/Subscription';
import { SubscriptionsPageMainSkeleton } from './SubscriptionsPageMainSkeleton';
import { fetchInitSubscriptions } from '../../model/services/fetchInitSubscriptions/fetchInitSubscriptions';
import {
    getSubscriptionsPageMainError,
    getSubscriptionsPageMainIsLoading,
} from '../../model/selectors/getSubscriptionsPageMain/getSubscriptionsPageMain';
import cls from './SubscriptionsPageMain.module.scss';
import { getSubscriptionsPageMain, SubscriptionsPageMainReducer } from '../../model/slices/SubscriptionsPageMainSlice';

interface SubscriptionsPageMainProps {
    className?: string;
}

const reducers: ReducersList = {
    subscriptionsPageMain: SubscriptionsPageMainReducer,
};

export const SubscriptionsPageMain = memo((props: SubscriptionsPageMainProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const userProfileId = useSelector(getUserProfileId);
    const isCurrentProfile = userProfileId === id;
    const isLoading = useSelector(getSubscriptionsPageMainIsLoading);
    const error = useSelector(getSubscriptionsPageMainError);
    const subscriptions = useSelector(getSubscriptionsPageMain.selectAll);

    useEffect(() => {
        const originalTitle = document.title;
        if (error) {
            document.title = error;
        } else {
            document.title = t('Подписки');
        }

        return () => {
            document.title = originalTitle;
        };
    }, [error, t]);

    useEffect(() => {
        if (id) {
            dispatch(fetchInitSubscriptions(id));
        }
    }, [dispatch, id]);

    let content;
    const getContent = () => {
        if (isLoading) {
            content = <SubscriptionsPageMainSkeleton />;
        } else if (error) {
            content = (
                <VStack
                    gap="8"
                >
                    <Text
                        isBold
                        theme={TextTheme.PRIMARY}
                        size={TextSize.SSM}
                    >
                        {isCurrentProfile ? t('Ваши подписки') : t('Подписки пользователя')}
                    </Text>
                    <Text
                        isBold
                        theme={TextTheme.PRIMARY}
                        size={TextSize.SSM}
                    >
                        {t('Что то пошло не так')}
                    </Text>
                </VStack>
            );
        } else {
            content = (
                <VStack
                    gap="8"
                >
                    <Text
                        isBold
                        theme={TextTheme.PRIMARY}
                        size={TextSize.SSM}
                    >
                        {isCurrentProfile ? t('Ваши подписки') : t('Подписки пользователя')}
                    </Text>
                    {subscriptions.map((item) => (
                        <Subscription
                            subscription={item}
                            key={item.profileId}
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
                className={classNames(cls.SubscriptionsPageMain, {}, [className])}
                theme={CardTheme.PANEL}
            >
                {getContent()}
            </Card>
        </DynamicModuleLoader>
    );
});
