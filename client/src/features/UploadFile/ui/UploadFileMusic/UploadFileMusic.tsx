import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { Loader } from 'shared/ui/Loader/Loader';
import { FileInput } from 'shared/ui/FileInput/FileInput';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './UploadFileMusic.module.scss';
import { getUploadFileIsLoading } from '../../model/selectors/getUploadFile/getUploadFile';
import { UploadFileActions } from '../../model/slices/UploadFileSlice';
import { fetchUploadMusic } from '../../model/services/fetchUploadMusic/fetchUploadMusic';

interface UploadFileMusicProps {
    className?: string;
    onClose?: () => void;
}

export const UploadFileMusic = memo((props: UploadFileMusicProps) => {
    const { className, onClose } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getUploadFileIsLoading);

    const onChangeFileInput = useCallback(async (file: File) => {
        dispatch(UploadFileActions.setFileName(file.name));
        const result = await dispatch(fetchUploadMusic(file));
        if (result.meta.requestStatus === 'fulfilled') {
            onClose?.();
        }
    }, [onClose, dispatch]);

    return (
        <VStack
            maxH
            maxW
            align="center"
            justify="between"
            className={classNames(cls.UploadFileMusic, {}, [className])}
        >
            <HStack
                justify="center"
                maxW
                className={cls.header}
            >
                <Text
                    size={TextSize.SM}
                    theme={TextTheme.PRIMARY}
                >
                    {t('Загрузка музыки')}
                </Text>
            </HStack>
            <VStack
                align="center"
                maxW
                gap="16"
            >
                <Text
                    size={TextSize.SSM}
                    theme={TextTheme.GREY}
                >
                    {`${t('Вы можете загрузить музыку в формате')} .MP3`}
                </Text>
                {isLoading
                    ? (
                        <Loader />
                    )
                    : (
                        <FileInput
                            onChange={onChangeFileInput}
                            type="music"
                            accept=".mp3"
                        >
                            {t('Выбрать файл')}
                        </FileInput>
                    )}
            </VStack>
            <HStack
                justify="center"
                maxW
                className={cls.footer}
            >
                <Text
                    size={TextSize.S}
                    theme={TextTheme.PRIMARY}
                >
                    {t('Рекомендуем загружать и слушать музыку с хорошим содержанием')}
                </Text>
            </HStack>
        </VStack>
    );
});
