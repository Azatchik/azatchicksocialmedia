import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { Loader } from 'shared/ui/Loader/Loader';
import { FileInput } from 'shared/ui/FileInput/FileInput';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { UploadFileActions } from '../../model/slices/UploadFileSlice';
import { fetchUploadHeader } from '../../model/services/fetchUploadHeader/fetchUploadHeader';
import { getUploadFileIsLoading } from '../../model/selectors/getUploadFile/getUploadFile';
import cls from './UploadFileHeader.module.scss';

interface UploadFileHeaderProps {
    className?: string;
    onClose?: () => void;
}

export const UploadFileHeader = memo((props: UploadFileHeaderProps) => {
    const { className, onClose } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getUploadFileIsLoading);

    const onChangeFileInput = useCallback(async (file: File) => {
        dispatch(UploadFileActions.setFileName(file.name));
        const result = await dispatch(fetchUploadHeader(file));
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
            className={classNames(cls.UploadFileHeader, {}, [className])}
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
                    {t('Смена обложки')}
                </Text>
            </HStack>
            <VStack
                align="center"
                maxW
                gap="16"
            >
                <VStack
                    gap="4"
                    align="center"
                >
                    <Text
                        size={TextSize.SSM}
                        theme={TextTheme.GREY}
                    >
                        {`${t('Рекомендуемое соотношение разрешения изображения')} 4:1`}
                    </Text>
                    <Text
                        size={TextSize.SSM}
                        theme={TextTheme.GREY}
                    >
                        {`${t('Формат')} — .JPG ${t('или')} .PNG`}
                    </Text>
                </VStack>
                {isLoading
                    ? (
                        <Loader />
                    )
                    : (
                        <FileInput
                            onChange={onChangeFileInput}
                            type="header"
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
