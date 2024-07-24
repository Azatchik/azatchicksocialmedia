import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useEffect } from 'react';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Card, CardTheme } from 'shared/ui/Card/Card';
import { HStack, VStack } from 'shared/ui/Stack';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getProfileData } from 'entities/Profile';
import { useParams } from 'react-router-dom';
import { ProfileRecommendation } from 'entities/ProfileRecommendation';
import { Loader } from 'shared/ui/Loader/Loader';
import { TextTheme, Text, TextSize } from 'shared/ui/Text/Text';
import { fetchSubscribeRecommendations } from '../model/services/fetchSubscribeRecommendations/fetchSubscribeRecommendations';
import cls from './SubscribeRecommendations.module.scss';
import { SubscribeRecommendationsReducer } from '../model/slices/SubscribeRecommendationsSlice';
import {
    getSubscribeRecommendationsIsLoading,
    getSubscribeRecommendationsMembers,
} from '../model/selectors/getSubscribeRecommendations/getSubscribeRecommendations';
import { SubscribeRecommendationsSkeleton } from './SubscribeRecommendationsSkeleton';

interface SubscribeRecommendationsProps {
    className?: string;
}

const reducers: ReducersList = {
    subscribeRecommendations: SubscribeRecommendationsReducer,
};

export const SubscribeRecommendations = memo((props: SubscribeRecommendationsProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const subscribeRecommendationsMembers = useSelector(getSubscribeRecommendationsMembers);
    const isLoading = useSelector(getSubscribeRecommendationsIsLoading);
    const profileData = useSelector(getProfileData);

    useEffect(() => {
        dispatch(fetchSubscribeRecommendations());
    }, [dispatch]);

    let content;

    const getContent = () => {
        if (isLoading) {
            content = <SubscribeRecommendationsSkeleton />;
        } else {
            content = (
                <VStack>
                    <HStack
                        gap="4"
                        justify="start"
                        align="start"
                    >
                        <Text
                            theme={TextTheme.PRIMARY}
                            size={TextSize.SSM}
                            isBold
                            className={cls.header}
                        >
                            {t('Рекомендуем')}
                        </Text>
                    </HStack>
                    {subscribeRecommendationsMembers.map((member, index) => (
                        <ProfileRecommendation
                            profileRecommendation={member}
                            key={index}
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
                className={classNames(cls.SubscribeRecommendations, {}, [className])}
                theme={CardTheme.PANEL}
            >
                {getContent()}
            </Card>
        </DynamicModuleLoader>
    );
});
