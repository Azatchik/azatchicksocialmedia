import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useEffect, useMemo } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Music } from 'entities/Music';
import { useSelector } from 'react-redux';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { getUserProfileId } from 'entities/User';
import { getProfileData } from 'entities/Profile';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { fetchMusic } from '../../model/services/fetchMusic/fetchMusic';
import { getProfileMediaMusic, getProfileMediaMusicInited } from '../../model/selectors/getProfileMedia/getProfileMedia';
import cls from './ProfileMediaMusic.module.scss';
import { ProfileMediaMusicReducer } from '../../model/slices/ProfileMediaMusicSlice';

interface ProfileMediaMusicProps {
    className?: string;
}

const reducers: ReducersList = {
    profileMediaMusic: ProfileMediaMusicReducer,
};

export const ProfileMediaMusic = memo((props: ProfileMediaMusicProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const music = useSelector(getProfileMediaMusic);
    const currentProfileId = useSelector(getUserProfileId);
    const profileData = useSelector(getProfileData);
    const inited = useSelector(getProfileMediaMusicInited);
    const navigate = useNavigate();

    useEffect(() => {
        if (!music.length) {
            dispatch(fetchMusic());
        }
    }, [dispatch, music.length]);

    const getContent = useMemo(() => {
        if (!music.length && profileData.id === currentProfileId) {
            return (
                <VStack
                    align="center"
                    gap="8"
                    maxW
                    className={cls.musicNotFound}
                >
                    <Text
                        size={TextSize.SSM}
                        theme={TextTheme.GREY}
                    >
                        {t('Вы еще не добавили ни одну музыку')}
                    </Text>
                    <Button
                        theme={ButtonTheme.SECONDARY}
                        isSmall
                    >
                        {t('Добавить')}
                    </Button>
                </VStack>
            );
        }
        if (!music.length) {
            return (
                <HStack
                    justify="center"
                    maxW
                    className={cls.musicNotFound}
                >
                    <Text
                        size={TextSize.SSM}
                        theme={TextTheme.GREY}
                    >
                        {t('Этот пользователь пока не добавил ни одну музыку')}
                    </Text>
                </HStack>
            );
        }

        return (
            <VStack
                maxW
                maxH
                gap="8"
            >
                <HStack
                    gap="8"
                    maxW
                    maxH
                    className={classNames(cls.ProfileMediaMusic, {}, [className])}
                >
                    {music.map((item) => (
                        <Music
                            key={item.id}
                            music={item}
                            className={cls.musicCard}
                        />
                    ))}
                </HStack>
                <HStack
                    maxH
                    maxW
                    justify="center"
                    align="center"
                >
                    <Button
                        theme={ButtonTheme.SECONDARY_BLACK}
                        isMedium
                        onClick={() => navigate(RoutePath.music + profileData.id)}
                    >
                        {t('Показать все')}
                    </Button>
                </HStack>
            </VStack>
        );
    }, [className, currentProfileId, music, profileData.id, t]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            {inited ? getContent : null}
        </DynamicModuleLoader>
    );
});
