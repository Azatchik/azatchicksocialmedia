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
import { FollowerCard } from 'entities/Follower';
import cls from './FollowersPageMain.module.scss';
import { FollowersPageMainReducer, getFollowersPageMain } from '../../model/slices/FollowersPageMainSlice';
import {
    getFollowersPageMainError,
    getFollowersPageMainIsLoading,
} from '../../model/selectors/getFollowersPageMain/getFollowersPageMain';
import { fetchInitFollowers } from '../../model/services/fetchInitFollowers/fetchInitFollowers';
import { FollowersPageMainSkeleton } from './FollowersPageMainSkeleton';

interface FollowersPageMainProps {
    className?: string;
}

const reducers: ReducersList = {
    followersPageMain: FollowersPageMainReducer,
};

export const FollowersPageMain = memo((props: FollowersPageMainProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const userProfileId = useSelector(getUserProfileId);
    const isCurrentProfile = userProfileId === id;
    const isLoading = useSelector(getFollowersPageMainIsLoading);
    const error = useSelector(getFollowersPageMainError);
    const followers = useSelector(getFollowersPageMain.selectAll);

    useEffect(() => {
        const originalTitle = document.title;
        if (error) {
            document.title = error;
        } else {
            document.title = t('Подписчики');
        }

        return () => {
            document.title = originalTitle;
        };
    }, [error, t]);

    useEffect(() => {
        if (id) {
            dispatch(fetchInitFollowers(id));
        }
    }, [dispatch, id]);

    let content;
    const getContent = () => {
        if (isLoading) {
            content = <FollowersPageMainSkeleton />;
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
                        {isCurrentProfile ? t('Ваши подписчики') : t('Подписчики пользователя')}
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
                        {isCurrentProfile ? t('Ваши подписчики') : t('Подписчики пользователя')}
                    </Text>
                    {followers.map((item) => (
                        <FollowerCard
                            follower={item}
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
                className={classNames(cls.FollowersPageMain, {}, [className])}
                theme={CardTheme.PANEL}
            >
                {getContent()}
            </Card>
        </DynamicModuleLoader>
    );
});
