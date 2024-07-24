import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useEffect } from 'react';
import { Page } from 'widgets/Page/Page';
import { SubscribeRecommendations } from 'features/SubscribeRecommendations';
import { SubscriptionsPageMain } from 'widgets/SubscriptionsPageMain';
import { HStack } from 'shared/ui/Stack';
import cls from './SubscriptionsPage.module.scss';

interface SubscriptionsPageProps {
    className?: string;
}

const SubscriptionsPage = memo((props: SubscriptionsPageProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <Page className={classNames(cls.SubscriptionsPage, {}, [className])}>
            <HStack
                gap="20"
                align="start"
            >
                <SubscriptionsPageMain />
                <SubscribeRecommendations />
            </HStack>
        </Page>
    );
});

export default SubscriptionsPage;
