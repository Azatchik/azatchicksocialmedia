import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack, VStack } from 'shared/ui/Stack';
import { useSelector } from 'react-redux';
import { Music } from 'entities/Music';
import { Loader, LoaderSizes } from 'shared/ui/Loader/Loader';
import { TextSize, TextTheme, Text } from 'shared/ui/Text/Text';
import {
    getMusicPageMainMyMusicCurrentProfileMusic,
    getMusicPageMainMyMusicIsLoadingNext,
} from '../../model/selectors/getMusicPageMainMyMusic/getMusicPageMainMyMusic';
import cls from './MusicPageMainMyMusic.module.scss';
import { getMusicPageMainMyMusic } from '../../model/slices/MusicPageMainMyMusicSlice';

interface MusicPageMainMyMusicProps {
    className?: string;
}

export const MusicPageMainMyMusic = memo((props: MusicPageMainMyMusicProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const music = useSelector(getMusicPageMainMyMusic.selectAll);
    const currentProfileMusic = useSelector(getMusicPageMainMyMusicCurrentProfileMusic);
    const isLoadingNext = useSelector(getMusicPageMainMyMusicIsLoadingNext);

    return (
        <VStack
            className={classNames(cls.MusicPageMainMyMusic, {}, [className])}
            gap="8"
            maxW
        >
            {music.length
                ? music.map((item) => (
                    <Music
                        music={item}
                        key={item.id}
                        withOptions
                        className={cls.musicItem}
                        isHave={currentProfileMusic.includes(item.id)}
                    />
                ))
                : (
                    <HStack
                        maxW
                        justify="center"
                    >
                        <Text
                            theme={TextTheme.GREY}
                            isBold
                            size={TextSize.SM}
                            className={cls.noMusic}
                        >
                            {t('Вы еще не добавили ни одну музыку')}
                        </Text>
                    </HStack>
                )}
            {isLoadingNext && (
                <HStack
                    maxW
                    justify="center"
                >
                    <Loader size={LoaderSizes.SMALL_SIZE} />
                </HStack>
            )}
        </VStack>
    );
});
