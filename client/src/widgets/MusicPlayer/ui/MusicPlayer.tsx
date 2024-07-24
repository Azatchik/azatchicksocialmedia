import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, {
    memo, MutableRefObject, useCallback, useEffect, useRef, useState,
} from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import prevAudio from 'shared/assets/icons/prev-audio.svg';
import nextAudio from 'shared/assets/icons/next-audio.svg';
import playAudio from 'shared/assets/icons/play-audio.svg';
import pauseAudio from 'shared/assets/icons/pause-audio.svg';
import { Icon, IconSizes } from 'shared/ui/Icon/Icon';
import { HStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { MUSIC_PLAYER_ID } from 'shared/const/components';
import { Portal } from 'shared/ui/Portal/Portal';
import { MusicPlayerPlaylist } from './MusicPlayerPlaylist/MusicPlayerPlaylist';
import { MusicPlayerActions } from '../model/slices/MusicPlayerSlice';
import {
    getMusicPlayerCurrentTime,
    getMusicPlayerIsPlaying,
    getMusicPlayerMusic,
    getMusicPlayerMusicIndex,
    getMusicPlayerVolume,
} from '../model/selectors/getMusicPlayer/getMusicPlayer';
import cls from './MusicPlayer.module.scss';

interface MusicPlayerProps {
    className?: string;
}

export const MusicPlayer = memo((props: MusicPlayerProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const ref = useRef() as MutableRefObject<HTMLAudioElement>;
    const interval = useRef() as MutableRefObject<ReturnType<typeof setInterval>>;
    const timeout = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
    const isPlaying = useSelector(getMusicPlayerIsPlaying);
    const music = useSelector(getMusicPlayerMusic);
    const currentTime = useSelector(getMusicPlayerCurrentTime);
    const indexMusic = useSelector(getMusicPlayerMusicIndex);
    const volume = useSelector(getMusicPlayerVolume);
    const [isVisiblePlaylist, setIsVisiblePlaylist] = useState<boolean>(false);

    const isMusic = Object.values(music)[1];

    useEffect(() => {
        if (isMusic) {
            dispatch(MusicPlayerActions.clearCurrentTime());
            ref.current.load();
            dispatch(MusicPlayerActions.setIsPlaying(true));
        }
    }, [dispatch, isMusic]);

    const onPlayingControlClick = useCallback((e: any) => {
        e.stopPropagation();
        if (isPlaying) {
            dispatch(MusicPlayerActions.setIsPlaying(false));
            ref.current.pause();
        } else {
            dispatch(MusicPlayerActions.setIsPlaying(true));
            ref.current.play();
        }
    }, [dispatch, isPlaying]);

    const onNextControlClick = useCallback((e: any) => {
        e.stopPropagation();
        dispatch(MusicPlayerActions.nextMusicIndex());
    }, [dispatch]);

    const onPrevControlClick = useCallback((e: any) => {
        e.stopPropagation();
        dispatch(MusicPlayerActions.prevMusicIndex());
    }, [dispatch]);

    const onLoaded = useCallback((e: any) => {
        if (e.target.readyState === 4) {
            e.target.play();
            const duration = Math.floor(e.target.duration);
            dispatch(MusicPlayerActions.setDuration(duration));
            clearInterval(interval.current);
            clearTimeout(timeout.current);
            ref.current.volume = volume;
            interval.current = setInterval(() => {
                dispatch(MusicPlayerActions.incrementCurrentTime());
            }, 1000);
            timeout.current = setTimeout(() => {
                clearInterval(interval.current);
            }, duration * 1000);
        }
    }, [dispatch, volume]);

    const onPause = useCallback(() => {
        clearInterval(interval.current);
        clearTimeout(timeout.current);
    }, []);

    const onPlay = useCallback((e: any) => {
        if (e.target.readyState === 4) {
            const duration = Math.floor(e.target.duration);
            clearInterval(interval.current);
            clearTimeout(timeout.current);
            interval.current = setInterval(() => {
                dispatch(MusicPlayerActions.incrementCurrentTime());
            }, 1000);
            timeout.current = setTimeout(() => {
                clearInterval(interval.current);
            }, (duration - currentTime) * 1000);
        }
    }, [currentTime, dispatch]);

    const onMusicPlayerClick = useCallback(() => {
        setIsVisiblePlaylist((prevState) => !prevState);
    }, []);

    const mods: Mods = {
        [cls.isVisible]: isMusic,
    };

    return (
        <>
            {isVisiblePlaylist && <Portal><div className={cls.clickArea} onClick={onMusicPlayerClick} /></Portal>}
            <HStack
                gap="16"
                align="center"
                maxH
                className={classNames(cls.MusicPlayer, mods, [className])}
                onClick={onMusicPlayerClick}
            >
                <Button
                    theme={ButtonTheme.CLEAN_GREY}
                    onClick={onPrevControlClick}
                >
                    <Icon
                        Svg={prevAudio}
                        size={IconSizes.HIGHER_SMALL}
                    />
                </Button>
                <Button
                    theme={ButtonTheme.CLEAN_GREY}
                    onClick={onPlayingControlClick}
                >
                    <Icon
                        Svg={isPlaying ? pauseAudio : playAudio}
                        size={IconSizes.HIGHER_SMALL}
                    />
                </Button>
                <Button
                    theme={ButtonTheme.CLEAN_GREY}
                    onClick={onNextControlClick}
                >
                    <Icon
                        Svg={nextAudio}
                        size={IconSizes.HIGHER_SMALL}
                    />
                </Button>
                <Text
                    theme={TextTheme.GREY}
                    size={TextSize.SSM}
                    className={cls.musicInfo}
                    noWrap
                >
                    {`${music.artist || t('Неизвестно')} - ${music.name || t('Неизвестно')}`}
                </Text>
            </HStack>
            <MusicPlayerPlaylist
                isVisible={isVisiblePlaylist}
                onPrevControlClick={onPrevControlClick}
                onNextControlClick={onNextControlClick}
                onPlayingControlClick={onPlayingControlClick}
            />
            <audio
                ref={ref}
                id={MUSIC_PLAYER_ID}
                onLoadedData={onLoaded}
                onPause={onPause}
                onPlay={onPlay}
                onEnded={onNextControlClick}
            >
                <source src={`${__API__}/static/profiles/${music.file}`} type="audio/mpeg" />
            </audio>
        </>
    );
});
