import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
    memo, MutableRefObject, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { Card, CardTheme } from 'shared/ui/Card/Card';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { HStack, VStack } from 'shared/ui/Stack';
import { Music } from 'entities/Music';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon, IconSizes, IconTheme } from 'shared/ui/Icon/Icon';
import arrowNextIcon from 'shared/assets/icons/arrow-next.svg';
import arrowPrevIcon from 'shared/assets/icons/arrow-prev.svg';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import refreshIcon from 'shared/assets/icons/refresh.svg';
import { MusicRecommendationsSkeleton } from './MusicRecommendationsSkeleton';
import { fetchMusicRecommendations } from '../model/services/fetchMusicRecommendations/fetchMusicRecommendations';
import cls from './MusicRecommendations.module.scss';
import { MusicRecommendationsActions, MusicRecommendationsReducer } from '../model/slices/MusicRecommendationsSlice';
import {
    getMusicRecommendationsAddedMusic,
    getMusicRecommendationsData,
    getMusicRecommendationsError,
    getMusicRecommendationsIsLoading,
} from '../model/selectors/getMusicRecommendations/getMusicRecommendations';

interface MusicRecommendationsProps {
    className?: string;
}

const reducers: ReducersList = {
    musicRecommendations: MusicRecommendationsReducer,
};

export const MusicRecommendations = memo((props: MusicRecommendationsProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getMusicRecommendationsIsLoading);
    const error = useSelector(getMusicRecommendationsError);
    const data = useSelector(getMusicRecommendationsData);
    const addedMusic = useSelector(getMusicRecommendationsAddedMusic);
    const [scrollValue, setScrollValue] = useState(0);
    const ref = useRef() as MutableRefObject<HTMLDivElement>;

    useEffect(() => {
        if (!data.length) {
            dispatch(fetchMusicRecommendations());
        }
    }, [data.length, dispatch]);

    useEffect(() => {
        setScrollValue(0);
    }, [isLoading]);

    const onNextArrowClick = useCallback(() => {
        const newValue = scrollValue + 245;
        setScrollValue(newValue);
        ref.current.scrollLeft = newValue;
    }, [scrollValue]);

    const onPrevArrowClick = useCallback(() => {
        const newValue = scrollValue - 245;
        setScrollValue(newValue);
        ref.current.scrollLeft = newValue;
    }, [scrollValue]);

    const fetchRefreshRecommendations = useCallback(() => {
        dispatch(fetchMusicRecommendations());
    }, [dispatch]);

    const debouncedFetchRefreshRecommendations = useDebounce(fetchRefreshRecommendations, 2000);

    const onRefreshClick = useCallback(() => {
        dispatch(MusicRecommendationsActions.setIsLoading(true));
        debouncedFetchRefreshRecommendations();
    }, [debouncedFetchRefreshRecommendations, dispatch]);

    let content;
    const canScrollValue = useMemo(() => {
        if (data.length === 15 || data.length > 12) {
            return 490;
        }
        if (data.length > 9 && data.length < 13) {
            return 245;
        }
        return 0;
    }, [data.length]);

    if (isLoading) {
        content = <MusicRecommendationsSkeleton />;
    } else if (error) {
        content = (
            <Text
                theme={TextTheme.PRIMARY}
                size={TextSize.SSM}
                isBold
            >
                {t('Что то пошло не так')}
            </Text>
        );
    } else if (!data.length) {
        content = (
            <HStack
                className={cls.recommendationNotFound}
                maxW
                justify="center"
            >
                <Text
                    theme={TextTheme.GREY}
                    size={TextSize.SSM}
                    isBold
                >
                    {t('Рекомендации закончились, загляните позже...')}
                </Text>
            </HStack>
        );
    } else {
        content = (
            <VStack
                className={cls.musicStack}
                maxH
                gap="16"
            >
                {data.map((item) => (
                    <Music
                        music={item}
                        key={item.id}
                        className={cls.musicItem}
                        withOptions
                        isHave={addedMusic.includes(item.id)}
                    />
                ))}
            </VStack>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Card
                className={classNames(cls.MusicRecommendations, {}, [className])}
                theme={CardTheme.PANEL}
            >
                {!isLoading && (
                    <HStack
                        maxW
                        className={cls.header}
                        justify="between"
                    >
                        <Text
                            theme={TextTheme.PRIMARY}
                            size={TextSize.SSM}
                            isBold
                        >
                            {t('Популярная музыка')}
                        </Text>
                        <Button
                            theme={ButtonTheme.CLEAN_BLUE}
                            onClick={onRefreshClick}
                            className={cls.refreshBtn}
                        >
                            <Icon
                                Svg={refreshIcon}
                                size={IconSizes.SMALL}
                                theme={IconTheme.BLUE}
                            />
                        </Button>
                    </HStack>
                )}
                <div
                    ref={ref}
                    className={cls.contentWrapper}
                >
                    {content}
                </div>
                {!!scrollValue && (
                    <Button
                        theme={ButtonTheme.CLEAN}
                        className={cls.stackBtnPrev}
                        isRound
                        onClick={onPrevArrowClick}
                    >
                        <Icon
                            Svg={arrowPrevIcon}
                            size={IconSizes.LOWER_SMALL}
                        />
                    </Button>
                )}
                {scrollValue < canScrollValue && (
                    <Button
                        theme={ButtonTheme.CLEAN}
                        className={cls.stackBtnNext}
                        isRound
                        onClick={onNextArrowClick}
                    >
                        <Icon
                            Svg={arrowNextIcon}
                            size={IconSizes.LOWER_SMALL}
                        />
                    </Button>
                )}
            </Card>
        </DynamicModuleLoader>
    );
});
