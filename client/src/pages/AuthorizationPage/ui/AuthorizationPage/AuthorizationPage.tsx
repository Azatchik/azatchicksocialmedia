import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Icon, IconSizes } from 'shared/ui/Icon/Icon';
import mainLogo from 'shared/assets/icons/main-logo.svg';
import { VStack } from 'shared/ui/Stack';
import React, {
    memo, useCallback, useState,
} from 'react';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { AuthorizationByPhoneModal } from 'features/AuthorizationByPhone';
import { RegistrationByPhoneModal } from 'features/RegistrationByPhone';
import { useSelector } from 'react-redux';
import { getUserProfileId, getUserPhone } from 'entities/User';
import { CreateProfileModal } from 'features/CreateProfile';
import { getResetPasswordMethodsData, ResetPasswordModal } from 'features/ResetPassword';
import { AuthorizationPageFooter } from '../AuthorizationPageFooter/AuthorizationPageFooter';
import cls from './AuthorizationPage.module.scss';

interface AuthorizationPageProps {
    className?: string;
}

const AuthorizationPage = memo(({ className }: AuthorizationPageProps) => {
    const { t } = useTranslation(['authorizationPage', 'translation']);
    const [isOpenModalAuth, setIsOpenModalAuth] = useState<boolean>(false);
    const [isOpenModalReg, setIsOpenModalReg] = useState<boolean>(false);
    const [isOpenModalCreateProfile, setIsOpenModalCreateProfile] = useState<boolean>(true);
    const [isOpenModalResetPassword, setIsOpenModalResetPassword] = useState<boolean>(false);
    const isUserConfirm = useSelector(getUserPhone);
    const isUserProfile = useSelector(getUserProfileId);
    const isResettingPassword = useSelector(getResetPasswordMethodsData);

    const onShowModalReset = useCallback(() => {
        if (isOpenModalAuth) {
            setIsOpenModalAuth(false);
        }
        setIsOpenModalResetPassword(true);
    }, [isOpenModalAuth]);

    const onCloseModalReset = useCallback(() => {
        setIsOpenModalResetPassword(false);
    }, []);

    const onShowModalAuth = useCallback(() => {
        if (isOpenModalReg) {
            setIsOpenModalReg(false);
        }
        if (isUserConfirm) {
            setIsOpenModalCreateProfile(true);
        } else if (isResettingPassword) {
            setIsOpenModalResetPassword(true);
        } else {
            setIsOpenModalAuth(true);
        }
    }, [isOpenModalReg, isUserConfirm, isResettingPassword]);

    const onCloseModalAuth = useCallback(() => {
        setIsOpenModalAuth(false);
    }, []);

    const onShowModalReg = useCallback(() => {
        if (isOpenModalAuth) {
            setIsOpenModalAuth(false);
        }
        if (isUserConfirm) {
            setIsOpenModalCreateProfile(true);
        } else if (isResettingPassword) {
            setIsOpenModalResetPassword(true);
        } else {
            setIsOpenModalReg(true);
        }
    }, [isOpenModalAuth, isResettingPassword, isUserConfirm]);

    const onCloseModalReg = useCallback(() => {
        setIsOpenModalReg(false);
    }, []);

    const onCloseModalCreateProfile = useCallback(() => {
        setIsOpenModalCreateProfile(false);
    }, []);

    return (
        <div className={classNames(cls.AuthorizationPage, {}, [className])}>
            <Text size={TextSize.L}>{t('AZATCHIK_SOCIAL_MEDIA')}</Text>
            <div className={cls.authorizationWrapper}>
                <Icon
                    Svg={mainLogo}
                    size={IconSizes.BIG}
                    className={cls.mainLogo}
                />
                <VStack align="start" gap="16" className={cls.welcomeBlock}>
                    <Text
                        size={TextSize.XL}
                        theme={TextTheme.SECONDARY}
                        className={cls.firstWelcome}
                    >
                        {t('У нас всегда все в курсе всего')}
                    </Text>
                    <Text
                        size={TextSize.L}
                        theme={TextTheme.SECONDARY}
                        className={cls.secondWelcome}
                    >
                        {`${t('Заходи родной')}.`}
                    </Text>
                    <VStack>
                        <Button
                            theme={ButtonTheme.PRIMARY}
                            onClick={onShowModalReg}
                        >
                            {t('Зарегистрироваться')}
                        </Button>
                        {!isUserConfirm && (
                            <RegistrationByPhoneModal
                                onClose={onCloseModalReg}
                                isOpen={isOpenModalReg}
                                onOpenAuth={onShowModalAuth}
                            />
                        )}
                        <Text
                            size={TextSize.SS}
                            theme={TextTheme.GREY}
                            className={cls.conditions}
                        >
                            {`${t('Регистрируясь, вы соглашаетесь с Условиями '
                                + 'предоставления услуг и Политикой конфиденциальности, а '
                                + 'также с Политикой использования файлов cookie')}.`}
                        </Text>
                        <Text size={TextSize.M}>{`${t('Уже зарегистрированы')}?`}</Text>
                        <Button
                            theme={ButtonTheme.SECONDARY}
                            className={cls.loginBtn}
                            onClick={onShowModalAuth}
                        >
                            {t('Войти')}
                        </Button>
                        {!isUserConfirm && (
                            <AuthorizationByPhoneModal
                                onClose={onCloseModalAuth}
                                isOpen={isOpenModalAuth}
                                onOpenReg={onShowModalReg}
                                onOpenReset={onShowModalReset}
                            />
                        )}
                        {!isUserConfirm && (
                            <ResetPasswordModal
                                onClose={onCloseModalReset}
                                isOpen={isOpenModalResetPassword}
                            />
                        )}
                        {isUserConfirm && !isUserProfile && (
                            <CreateProfileModal
                                onClose={onCloseModalCreateProfile}
                                isOpen={isOpenModalCreateProfile}
                            />
                        )}
                    </VStack>
                </VStack>
            </div>
            <AuthorizationPageFooter className={cls.footer} />
        </div>
    );
});

export default AuthorizationPage;
