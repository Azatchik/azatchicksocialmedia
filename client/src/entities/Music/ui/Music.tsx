import { useTranslation } from 'react-i18next';
import React, {
    memo, useCallback, useMemo, useState,
} from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { Image } from 'shared/ui/Image/Image';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { Icon, IconSizes, IconTheme } from 'shared/ui/Icon/Icon';
import playAudio from 'shared/assets/icons/play-audio.svg';
import pauseAudio from 'shared/assets/icons/pause-audio.svg';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    getMusicPlayerCurrentTime,
    getMusicPlayerIsPlaying,
    getMusicPlayerMusic,
    MusicPlayerActions,
} from 'widgets/MusicPlayer';
import { useSelector } from 'react-redux';
import { getFormatTime } from 'shared/lib/getFormatTime/getFormatTime';
import { MUSIC_PLAYER_ID } from 'shared/const/components';
import threeDotsIcon from 'shared/assets/icons/three-dots.svg';
import { Dropdown, DropdownItem } from 'shared/ui/Dropdown/Dropdown';
import saveIcon from 'shared/assets/icons/save.svg';
import plusIcon from 'shared/assets/icons/plus.svg';
import minusIcon from 'shared/assets/icons/minus.svg';
import { getUserProfileId } from 'entities/User';
import { ProfileActions } from 'entities/Profile';
import { ProfileMediaMusicActions } from 'widgets/ProfileMedia';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Portal } from 'shared/ui/Portal/Portal';
import { MusicPageMainMyMusicActions, MusicPageMainSearchActions } from 'widgets/MusicPageMain';
import { useParams } from 'react-router-dom';
import { MusicRecommendationsActions } from 'features/MusicRecommendations';
import { fetchAddMusic } from '../model/services/fetchAddMusic/fetchAddMusic';
import { fetchDeleteMusic } from '../model/services/fetchDeleteMusic/fetchDeleteMusic';
import { MusicSchema } from '../model/types/MusicSchema';
import cls from './Music.module.scss';

interface MusicProps {
    className?: string;
    music: MusicSchema;
    withOptions?: boolean;
    isHave?: boolean;
}

export const Music = memo((props: MusicProps) => {
    const {
        className,
        music,
        withOptions = false,
        isHave = false,
    } = props;
    const { t } = useTranslation();
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const playerMusic = useSelector(getMusicPlayerMusic);
    const isPlaying = useSelector(getMusicPlayerIsPlaying);
    const currentTime = useSelector(getMusicPlayerCurrentTime);
    const userProfileId = useSelector(getUserProfileId);
    const { id } = useParams();
    const musicPlayerControl = document.getElementById(MUSIC_PLAYER_ID) as HTMLAudioElement;
    const [isOpenedOptions, setIsOpenedOptions] = useState<boolean>(false);

    const isCurrentMusic = useMemo(
        () => Object.values(music)[1] === Object.values(playerMusic)[1],
        // eslint-disable-next-line
        [music, playerMusic.id],
    );

    const onMusicClick = useCallback(() => {
        if (isCurrentMusic) {
            if (isPlaying) {
                dispatch(MusicPlayerActions.setIsPlaying(false));
                musicPlayerControl.pause();
            } else {
                dispatch(MusicPlayerActions.setIsPlaying(true));
                musicPlayerControl.play();
            }
        } else {
            dispatch(MusicPlayerActions.setMusic(music));
        }
    }, [isCurrentMusic, isPlaying, dispatch, musicPlayerControl, music]);

    const mods: Mods = {
        [cls.isPlaying]: isCurrentMusic && isPlaying,
        [cls.isCurrent]: isCurrentMusic,
    };

    const musicDropdownItems = useMemo<DropdownItem[]>(() => (
        [
            {
                value: 'downloadMusic',
                icon: saveIcon,
                iconTheme: IconTheme.BLUE,
                text: t('Скачать'),
            },
            !isHave
                ? {
                    value: 'addMusic',
                    icon: plusIcon,
                    iconTheme: IconTheme.BLUE,
                    text: t('Добавить к себе'),
                }
                : {
                    value: 'removeMusic',
                    icon: minusIcon,
                    iconTheme: IconTheme.RED,
                    text: t('Убрать у себя'),
                },
        ]
    ), [t, isHave]);

    const onClickDropdownItem = useCallback((value: string) => {
        if (value === 'addMusic') {
            if (userProfileId === id) {
                dispatch(ProfileMediaMusicActions.addMusic(music));
                dispatch(MusicPageMainMyMusicActions.addMusic(music));
            }
            dispatch(fetchAddMusic(music.id));
            dispatch(MusicRecommendationsActions.addMusic(music.id));
            dispatch(MusicPageMainMyMusicActions.addCurrentMusic(music.id));
        }
        if (value === 'downloadMusic') {
            window.open(`${__API__}/static/profiles/${music.file}`, '_blank');
        }
        if (value === 'removeMusic') {
            dispatch(MusicPageMainMyMusicActions.removeCurrentMusic(music.id));
            dispatch(MusicRecommendationsActions.removeAddedMusic(music.id));
            dispatch(fetchDeleteMusic(music.id));
            if (id === userProfileId) {
                dispatch(MusicPageMainMyMusicActions.removeMusic(music.id));
            }
        }
        setIsOpenedOptions(false);
    }, [dispatch, music, id, userProfileId]);

    const onClickOptions = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpenedOptions((prevState) => !prevState);
    }, []);

    return (
        <HStack
            className={classNames(cls.Music, mods, [className])}
            align="center"
        >
            <HStack
                justify="between"
                align="center"
                gap="8"
                maxH
                onClick={onMusicClick}
                className={cls.musicInfoWrapper}
            >
                <div
                    className={cls.imageWrapper}
                >
                    <Image
                        src={music.image
                            ? `${__API__}/static/profiles/${music.image}`
                            : `${__API__}/static/defaults/${
                                theme === Theme.DARK
                                    ? 'music-image-dark.jpeg'
                                    : 'music-image-light.jpeg'
                            }`}
                        height={50}
                        width={50}
                        className={cls.musicImg}
                    />
                    <Icon
                        Svg={isCurrentMusic && isPlaying
                            ? pauseAudio
                            : playAudio}
                        size={IconSizes.SMALL}
                        className={cls.iconImg}
                        theme={IconTheme.SECONDARY}
                    />
                    <div className={cls.overlay} />
                    <div className={cls.soundAnim}>
                        <div className={cls.item1} />
                        <div className={cls.item2} />
                        <div className={cls.item3} />
                        <div className={cls.item4} />
                    </div>
                </div>
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
                {isCurrentMusic && (
                    <Text
                        size={TextSize.S}
                        theme={TextTheme.SECONDARY}
                        className={cls.currentTime}
                    >
                        {getFormatTime(currentTime)}
                    </Text>
                )}
            </HStack>
            {withOptions && (
                <Button
                    theme={ButtonTheme.CLEAN}
                    onClick={onClickOptions}
                    className={cls.optionsBtn}
                >
                    <Icon
                        Svg={threeDotsIcon}
                        size={IconSizes.SMALL}
                    />
                </Button>
            )}
            {withOptions && (
                <Dropdown
                    items={musicDropdownItems}
                    onClickItem={onClickDropdownItem}
                    isVisible={isOpenedOptions}
                    className={cls.optionsDropdown}
                />
            )}
            {isOpenedOptions && withOptions && <Portal><div className={cls.clickArea} onClick={onClickOptions} /></Portal>}
        </HStack>
    );
});
