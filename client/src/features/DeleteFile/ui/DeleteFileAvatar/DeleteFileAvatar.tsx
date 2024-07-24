import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchDeleteAvatar } from '../../model/services/fetchDeleteAvatar/fetchDeleteAvatar';
import cls from './DeleteFileAvatar.module.scss';

interface DeleteFileAvatarProps {
    className?: string;
    onClose: () => void;
}

export const DeleteFileAvatar = memo((props: DeleteFileAvatarProps) => {
    const { className, onClose } = props;
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const onAcceptClick = useCallback(async () => {
        const result = await dispatch(fetchDeleteAvatar());
        if (result.meta.requestStatus === 'fulfilled') {
            onClose();
        }
    }, [dispatch, onClose]);

    const onCancelClick = useCallback(() => {
        onClose();
    }, [onClose]);

    return (
        <VStack
            gap="32"
            className={classNames(cls.DeleteFileAvatar, {}, [className])}
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
                    {t('Удаление аватара')}
                </Text>
            </HStack>
            <VStack
                maxW
                align="center"
                gap="8"
            >
                <Text
                    size={TextSize.SSM}
                    theme={TextTheme.PRIMARY}
                    align={TextAlign.CENTER}
                >
                    {`${t('Вы действительно хотите удалить аватар')}?`}
                </Text>
                <HStack
                    justify="center"
                    maxW
                    gap="8"
                >
                    <Button
                        theme={ButtonTheme.SECONDARY}
                        onClick={onCancelClick}
                        isShallow
                    >
                        {t('Нет')}
                    </Button>
                    <Button
                        theme={ButtonTheme.PRIMARY}
                        onClick={onAcceptClick}
                        isShallow
                    >
                        {t('Да')}
                    </Button>
                </HStack>
            </VStack>
        </VStack>
    );
});