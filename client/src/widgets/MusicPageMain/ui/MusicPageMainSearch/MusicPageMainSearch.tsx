import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { PanelInput } from 'shared/ui/PanelInput/PanelInput';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Music } from 'entities/Music';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import {
    getMusicPageMainMyMusicCurrentProfileMusic,
} from '../../model/selectors/getMusicPageMainMyMusic/getMusicPageMainMyMusic';
import { fetchSearch } from '../../model/services/fetchSearch/fetchSearch';
import {
    getMusicPageMainSearchIsLoading,
    getMusicPageMainSearchQuery,
} from '../../model/selectors/getMusicPageMainSearch/getMusicPageMainSearch';
import { getMusicPageMainSearch, MusicPageMainSearchActions } from '../../model/slices/MusicPageMainSearchSlice';
import cls from './MusicPageMainSearch.module.scss';
import { MusicPageMainSearchSkeleton } from './MusicPageMainSearchSkeleton';

interface MusicPageMainSearchProps {
    className?: string;
}

export const MusicPageMainSearch = memo((props: MusicPageMainSearchProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const searchedMusic = useSelector(getMusicPageMainSearch.selectAll);
    const currentProfileMusic = useSelector(getMusicPageMainMyMusicCurrentProfileMusic);
    const query = useSelector(getMusicPageMainSearchQuery);
    const isLoading = useSelector(getMusicPageMainSearchIsLoading);

    const fetchSearchFunc = useCallback(() => {
        dispatch(fetchSearch());
    }, [dispatch]);

    const debouncedFetchSearchFunc = useDebounce(fetchSearchFunc, 500);

    const onChangeQuery = useCallback((value: string) => {
        dispatch(MusicPageMainSearchActions.setQuery(value));
        if (value) {
            if (!isLoading) {
                dispatch(MusicPageMainSearchActions.setIsLoading(true));
            }
            debouncedFetchSearchFunc();
        }
    }, [dispatch, isLoading, debouncedFetchSearchFunc]);

    let content;

    const getContent = useCallback(() => {
        if (isLoading) {
            return <MusicPageMainSearchSkeleton />;
        } if (query && !searchedMusic.length) {
            return (
                <HStack
                    maxW
                    justify="center"
                    align="center"
                    className={cls.noSearchText}
                >
                    <Text
                        theme={TextTheme.GREY}
                        size={TextSize.SM}
                        isBold
                    >
                        {`${t('Ничего не найдено')}...`}
                    </Text>
                </HStack>
            );
        } if (!query) {
            return (
                <HStack
                    maxW
                    justify="center"
                    align="center"
                    className={cls.noSearchText}
                >
                    <Text
                        theme={TextTheme.GREY}
                        size={TextSize.SM}
                        isBold
                    >
                        {t('Введите запрос')}
                    </Text>
                </HStack>
            );
        }
        return searchedMusic.map((item) => (
            <Music
                music={item}
                key={item.id}
                withOptions
                className={cls.musicItem}
                isHave={currentProfileMusic.includes(item.id)}
            />
        ));
    }, [currentProfileMusic, isLoading, query, searchedMusic, t]);

    return (
        <VStack
            className={classNames(cls.MusicPageMainSearch, {}, [className])}
            gap="8"
            maxW
        >
            <VStack
                maxW
                gap="8"
            >
                <PanelInput
                    value={query}
                    onChange={onChangeQuery}
                    innerPlaceholder={t('Поиск музыки')}
                    maxWInput
                    maxW
                />
                {getContent()}
            </VStack>
        </VStack>
    );
});
