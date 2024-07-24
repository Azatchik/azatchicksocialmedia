import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import cls from './AuthorizationPageFooter.module.scss';

interface AuthorizationPageFooterProps {
    className?: string;
}

export const AuthorizationPageFooter = memo((props: AuthorizationPageFooterProps) => {
    const { className } = props;
    const { t } = useTranslation('authorizationPage');

    return (
        <VStack
            className={classNames(cls.AuthorizationPageFooter, {}, [className])}
            gap="8"
            align="center"
        >
            <HStack gap="16">
                <p className={cls.info}>{t('О нас')}</p>
                <p className={cls.info}>{t('Скачать приложение Azatchik_social_media')}</p>
                <p className={cls.info}>{t('Справочный центр')}</p>
                <p className={cls.info}>{t('Условия предоставления услуг')}</p>
                <p className={cls.info}>{t('Политика конфиденциальности')}</p>
                <p className={cls.info}>{t('Политика в отношении файлов cookie')}</p>
            </HStack>
            <HStack gap="16">
                <p className={cls.info}>{t('Специальные возможности')}</p>
                <p className={cls.info}>{t('Информация о рекламе')}</p>
                <p className={cls.info}>{t('Блог')}</p>
                <p className={cls.info}>{t('Работа')}</p>
                <p className={cls.info}>{t('Ресурсы бренда')}</p>
                <p className={cls.info}>{t('Реклама')}</p>
                <p className={cls.info}>{t('Маркетинг')}</p>
                <p className={cls.info}>{t('Azatchik_social_media для бизнеса')}</p>
                <p className={cls.info}>{t('Разработчикам')}</p>
                <p className={cls.info}>{t('Каталог')}</p>
                <p className={cls.info}>{t('Настройки')}</p>
            </HStack>
            <HStack>
                <p className={cls.info}>{t('© 2024 Azatchik_social_media Corp.')}</p>
            </HStack>
        </VStack>
    );
});
