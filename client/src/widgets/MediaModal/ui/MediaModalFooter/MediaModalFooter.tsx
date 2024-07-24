import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, {
    memo,
    MutableRefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { HStack } from 'shared/ui/Stack';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { Popup, PopupTheme } from 'shared/ui/Popup/Popup';
import {
    getMediaCatalog,
    getMediaDeletedArray,
    getMediaSelectedMedia,
    MediaActions,
} from 'entities/Media';
import { useSelector } from 'react-redux';
import { getUserProfileId } from 'entities/User';
import { getProfileData } from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './MediaModalFooter.module.scss';
import { fetchSetAvatar } from '../../model/services/fetchSetAvatar/fetchSetAvatar';

interface MediaModalFooterProps {
    className?: string;
}

export const MediaModalFooter = memo((props: MediaModalFooterProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const selectedMedia = useSelector(getMediaSelectedMedia);
    const catalog = useSelector(getMediaCatalog);
    const currentProfileId = useSelector(getUserProfileId);
    const arrayDeletedMedia = useSelector(getMediaDeletedArray);
    const profileData = useSelector(getProfileData);
    const [isVisiblePopupCopy, setIsVisiblePopupCopy] = useState<boolean>(false);
    const [popupMessage, setPopupMessage] = useState<string>('');
    const ref = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

    const onShareClick = useCallback(() => {
        navigator.clipboard.writeText(`${__API__}/static/${catalog}/${selectedMedia}`);
        setPopupMessage('Ссылка скопирована');
    }, [catalog, selectedMedia]);

    const onDeleteClick = useCallback(() => {
        dispatch(MediaActions.addArrayDeleted());
    }, [dispatch]);

    const onRestorClick = useCallback(() => {
        dispatch(MediaActions.setArrayDeleted());
    }, [dispatch]);

    const onSetAvatarClick = useCallback(() => {
        if (profileData.avatar !== selectedMedia) {
            dispatch(fetchSetAvatar());
            setPopupMessage('Фотография установлена как аватар');
        } else {
            setPopupMessage('Эта фотография уже является аватаром');
        }
    }, [profileData.avatar, dispatch, selectedMedia]);

    useEffect(() => {
        if (popupMessage) {
            setIsVisiblePopupCopy(true);
            ref.current = setTimeout(() => {
                setIsVisiblePopupCopy(false);
            }, 8000);
        }

        return () => {
            clearTimeout(ref.current);
            setIsVisiblePopupCopy(false);
        };
    }, [popupMessage]);

    return (
        <HStack
            justify={currentProfileId === profileData.id ? 'between' : 'end'}
            className={classNames(cls.MediaModalFooter, {}, [className])}
        >
            {currentProfileId === profileData.id && (
                <HStack
                    gap="16"
                >
                    {!arrayDeletedMedia.includes(selectedMedia) && (
                        <Button
                            theme={ButtonTheme.CLEAN_GREY}
                            onClick={onSetAvatarClick}
                        >
                            {t('Установить как аватар')}
                        </Button>
                    )}
                    {arrayDeletedMedia.includes(selectedMedia)
                        ? (
                            <HStack
                                gap="4"
                            >
                                <Text
                                    size={TextSize.SSM}
                                    theme={TextTheme.GREY}
                                >
                                    {`${t('Фотография удалена')}.`}
                                </Text>
                                <Button
                                    theme={ButtonTheme.CLEAN_BLUE}
                                    onClick={onRestorClick}
                                >
                                    {t('Восстановить')}
                                </Button>
                            </HStack>
                        )
                        : (
                            <Button
                                theme={ButtonTheme.CLEAN_GREY}
                                onClick={onDeleteClick}
                            >
                                {t('Удалить')}
                            </Button>
                        )}
                </HStack>
            )}
            {!arrayDeletedMedia.includes(selectedMedia) && (
                <Button
                    theme={ButtonTheme.CLEAN_GREY}
                    onClick={onShareClick}
                >
                    {t('Поделиться')}
                </Button>
            )}
            <Popup
                isMessage={isVisiblePopupCopy}
                className={cls.popup}
                theme={PopupTheme.BLUE}
            >
                <Text
                    theme={TextTheme.WHITE}
                    size={TextSize.SSM}
                >
                    {t(popupMessage)}
                </Text>
            </Popup>
        </HStack>
    );
});
