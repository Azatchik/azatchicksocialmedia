import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { Loader } from 'shared/ui/Loader/Loader';
import { FileInput } from 'shared/ui/FileInput/FileInput';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './UploadFileAvatar.module.scss';
import { getUploadFileIsLoading } from '../../model/selectors/getUploadFile/getUploadFile';
import { UploadFileActions } from '../../model/slices/UploadFileSlice';
import { fetchUploadAvatar } from '../../model/services/fetchUploadAvatar/fetchUploadAvatar';

interface UploadFileAvatarProps {
    className?: string;
    onClose?: () => void;
}

export const UploadFileAvatar = memo((props: UploadFileAvatarProps) => {
    const { className, onClose } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getUploadFileIsLoading);

    const onChangeFileInput = useCallback(async (file: File) => {
        dispatch(UploadFileActions.setFileName(file.name));
        const result = await dispatch(fetchUploadAvatar(file));
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
            className={classNames(cls.UploadFileAvatar, {}, [className])}
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
                    {t('Загрузка аватара')}
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
                    {`${t('Вы можете загрузить изображение в формате')} .JPG ${t('или')} .PNG`}
                </Text>
                {isLoading
                    ? (
                        <Loader />
                    )
                    : (
                        <FileInput
                            onChange={onChangeFileInput}
                            type="avatar"
                            accept=".jpg, .jpeg, .png"
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
                    {t('Если возникнут проблемы при загрузке изображения, попробуйте другой размер')}
                </Text>
            </HStack>
        </VStack>
    );
});
