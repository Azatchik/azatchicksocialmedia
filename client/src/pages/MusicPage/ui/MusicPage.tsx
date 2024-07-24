import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { Page } from 'widgets/Page/Page';
import { MusicRecommendations } from 'features/MusicRecommendations';
import { fetchMyMusicNext, MusicPageMain } from 'widgets/MusicPageMain';
import { VStack } from 'shared/ui/Stack';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './MusicPage.module.scss';

interface MusicPageProps {
    className?: string;
}

const MusicPage = memo((props: MusicPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [tabValue, setTabValue] = useState<string>('myMusic');

    const onSetTabValue = useCallback((value: string) => {
        setTabValue(value);
    }, []);

    const onLoadNextMusic = useCallback(() => {
        dispatch(fetchMyMusicNext());
    }, [dispatch]);

    return (
        <Page
            className={classNames(cls.MusicPage, {}, [className])}
            onScrollEnd={tabValue === 'myMusic' ? onLoadNextMusic : undefined}
        >
            <VStack
                gap="20"
            >
                <MusicRecommendations />
                <MusicPageMain tabValue={tabValue} onSetTabValue={onSetTabValue} />
            </VStack>
        </Page>
    );
});

export default MusicPage;
