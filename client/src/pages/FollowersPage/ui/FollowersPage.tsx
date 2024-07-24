import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { SubscribeRecommendations } from 'features/SubscribeRecommendations';
import { Page } from 'widgets/Page/Page';
import { HStack } from 'shared/ui/Stack';
import { FollowersPageMain } from 'widgets/FollowersPageMain';
import cls from './FollowersPage.module.scss';

interface FollowersPageProps {
    className?: string;
}

const FollowersPage = memo((props: FollowersPageProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <Page className={classNames(cls.FollowersPage, {}, [className])}>
            <HStack
                gap="20"
                align="start"
            >
                <FollowersPageMain />
                <SubscribeRecommendations />
            </HStack>
        </Page>
    );
});

export default FollowersPage;
