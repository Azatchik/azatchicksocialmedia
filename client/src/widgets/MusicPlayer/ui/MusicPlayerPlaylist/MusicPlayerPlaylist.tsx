import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useEffect } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Music } from 'entities/Music';
import { Card, CardTheme } from 'shared/ui/Card/Card';
import { classNames } from 'shared/lib/classNames/classNames';
import { Image } from 'shared/ui/Image/Image';
import { Range } from 'shared/ui/Range/Range';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { getFormatTime } from 'shared/lib/getFormatTime/getFormatTime';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon, IconSizes, IconTheme } from 'shared/ui/Icon/Icon';
import prevAudio from 'shared/assets/icons/prev-audio.svg';
import pauseAudio from 'shared/assets/icons/pause-audio.svg';
import playAudio from 'shared/assets/icons/play-audio.svg';
import nextAudio from 'shared/assets/icons/next-audio.svg';
import volumeMaxIcon from 'shared/assets/icons/volume-max.svg';
import volumeMinIcon from 'shared/assets/icons/volume-min.svg';
import { useHold } from 'shared/lib/hooks/useHold/useHold';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { MUSIC_PLAYER_ID } from 'shared/const/components';
import { PAGE_ID } from 'widgets/Page/Page';
import { Virtuoso } from 'react-virtuoso';
import {
    MusicPlayerActions,
} from '../../model/slices/MusicPlayerSlice';
import {
    getMusicPlayerCurrentTime,
    getMusicPlayerDuration,
    getMusicPlayerMusic,
    getMusicPlayerMusicArray,
    getMusicPlayerMusicIndex,
    getMusicPlayerIsPlaying,
    getMusicPlayerVolume,
} from '../../model/selectors/getMusicPlayer/getMusicPlayer';
import cls from './MusicPlayerPlaylist.module.scss';

interface MusicPlayerPlaylistProps {
    className?: string;
    isVisible: boolean;
    onPrevControlClick: (e: any) => void;
    onNextControlClick: (e: any) => void;
    onPlayingControlClick: (e: any) => void;
}

export const MusicPlayerPlaylist = memo((props: MusicPlayerPlaylistProps) => {
    const {
        className,
        isVisible,
        onPrevControlClick,
        onNextControlClick,
        onPlayingControlClick,
    } = props;
    const { t } = useTranslation();
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const indexMusic = useSelector(getMusicPlayerMusicIndex);
    const music = useSelector(getMusicPlayerMusic);
    const musicPlaylist = useSelector(getMusicPlayerMusicArray);
    const currentTime = useSelector(getMusicPlayerCurrentTime);
    const duration = useSelector(getMusicPlayerDuration);
    const isPlaying = useSelector(getMusicPlayerIsPlaying);
    const volume = useSelector(getMusicPlayerVolume);
    const musicPlayer = document.getElementById(MUSIC_PLAYER_ID) as HTMLAudioElement;
    const [isHold, bindHold] = useHold();

    useEffect(() => {
        if (music.file) {
            if (isHold && isPlaying) {
                dispatch(MusicPlayerActions.setIsPlaying(false));
                musicPlayer.pause();
            } else if (isHold && !isPlaying) {
                dispatch(MusicPlayerActions.setIsPlaying(false));
                musicPlayer.pause();
            } else {
                dispatch(MusicPlayerActions.setIsPlaying(true));
                musicPlayer.play();
            }
        }
    }, [dispatch, isHold]);

    const onChangeCurrentTime = useCallback((value: number) => {
        dispatch(MusicPlayerActions.setCurrentTime(value));
        musicPlayer.currentTime = value;
    }, [dispatch, musicPlayer]);

    const debouncedOnChangeCurrentTime = useDebounce(onChangeCurrentTime, 100);

    const onChangeVolume = useCallback((value: number) => {
        const newVolume = value / 100;
        dispatch(MusicPlayerActions.setVolume(newVolume));
        musicPlayer.volume = newVolume;
    }, [dispatch, musicPlayer]);

    const itemRenderer = useCallback((index, item) => (
        <Music
            music={item}
            key={item.id}
            withOptions
            className={cls.listItem}
        />
    ), []);

    if (!isVisible) {
        return null;
    }

    return (
        <Card
            className={classNames(cls.MusicPlayerPlaylist, {}, [className])}
            theme={CardTheme.PANEL}
        >
            <VStack
                maxW
                maxH
            >
                <HStack
                    maxW
                    align="center"
                    justify="center"
                    className={cls.playlistHeader}
                    gap="32"
                >
                    <HStack
                        align="center"
                        gap="8"
                    >
                        <Button
                            theme={ButtonTheme.CLEAN_GREY}
                            onClick={onPrevControlClick}
                        >
                            <Icon
                                Svg={prevAudio}
                                size={IconSizes.SMALL}
                            />
                        </Button>
                        <Button
                            theme={ButtonTheme.CLEAN_GREY}
                            onClick={onPlayingControlClick}
                        >
                            <Icon
                                Svg={isPlaying ? pauseAudio : playAudio}
                                size={IconSizes.SMALL}
                            />
                        </Button>
                        <Button
                            theme={ButtonTheme.CLEAN_GREY}
                            onClick={onNextControlClick}
                        >
                            <Icon
                                Svg={nextAudio}
                                size={IconSizes.SMALL}
                            />
                        </Button>
                    </HStack>
                    <VStack
                        className={cls.currentMusic}
                        gap="8"
                    >
                        <HStack
                            justify="between"
                            align="end"
                            maxW
                        >
                            <Image
                                src={music.image
                                    ? `${__API__}/static/profiles/${music.image}`
                                    : `${__API__}/static/defaults/${
                                        theme === Theme.DARK
                                            ? 'music-image-dark.jpeg'
                                            : 'music-image-light.jpeg'
                                    }`}
                                height={40}
                                width={40}
                                className={cls.musicImg}
                            />
                            <VStack
                                justify="center"
                                align="start"
                                className={cls.musicInfo}
                            >
                                <Text
                                    size={TextSize.SSM}
                                    theme={TextTheme.PRIMARY}
                                    className={cls.name}
                                    noWrap
                                >
                                    {music.name || t('Неизвестно')}
                                </Text>
                                <Text
                                    size={TextSize.S}
                                    theme={TextTheme.GREY}
                                    className={cls.artist}
                                    noWrap
                                >
                                    {music.artist || t('Неизвестно')}
                                </Text>
                            </VStack>
                            <Text
                                size={TextSize.S}
                                theme={TextTheme.GREY}
                            >
                                {getFormatTime(currentTime)}
                            </Text>
                        </HStack>
                        <Range
                            max={duration}
                            min={0}
                            width={300}
                            currentTime={currentTime}
                            onChange={debouncedOnChangeCurrentTime}
                            {...bindHold}
                        />
                    </VStack>
                    <HStack
                        gap="8"
                        align="center"
                    >
                        <Range
                            max={100}
                            min={0}
                            width={150}
                            currentVolume={volume}
                            onChange={onChangeVolume}
                        />
                        <Icon
                            Svg={volume ? volumeMaxIcon : volumeMinIcon}
                            size={IconSizes.SMALL}
                            theme={IconTheme.PANEL}
                        />
                    </HStack>
                </HStack>
                <VStack
                    maxW
                    gap="16"
                    className={cls.list}
                    align="center"
                >
                    <HStack
                        maxW
                        className={cls.listHeader}
                    >
                        <Text
                            size={TextSize.SSM}
                            theme={TextTheme.PRIMARY}
                        >
                            {t('Текущий плейлист')}
                        </Text>
                    </HStack>
                    <Virtuoso
                        style={{ width: '100%', height: '459px' }}
                        itemContent={itemRenderer}
                        data={musicPlaylist}
                        itemSize={() => 68}
                        components={{ Footer: () => <div style={{ height: '10px' }} /> }}
                        overscan={10}
                    />
                </VStack>
            </VStack>
        </Card>
    );
});
