import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, Suspense, useMemo } from 'react';
import { Modal, ModalSizes } from 'shared/ui/Modal/Modal';
import { Loader } from 'shared/ui/Loader/Loader';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useTranslation } from 'react-i18next';
import { Popup, PopupTheme } from 'shared/ui/Popup/Popup';
import { TextSize, TextTheme, Text } from 'shared/ui/Text/Text';
import { getUserId } from 'entities/User';
import { ResetPasswordAsync } from '../ResetPassword/ResetPassword.async';
import {
    getResetPasswordServerErrors,
} from '../../model/selectors/getResetPasswordServerErrors/getResetPasswordServerErrors';
import {
    getResetPasswordMethods,
    getResetPasswordToken,
    getResetPasswordValidationErrors,
} from '../../model/selectors/getResetPassword/getResetPassword';
import cls from './ResetPasswordModal.module.scss';
import { ResetPasswordValidateErrorTypes } from '../../model/types/ResetPasswordValidateErrorTypes';
import { ResetPasswordReducer } from '../../model/slices/ResetPasswordSlice';
import { ResetPasswordMethodsAsync } from '../ResetPasswordMethods/ResetPasswordMethods.async';
import { ResetPasswordConfirmCodeAsync } from '../ResetPasswordConfirmCode/ResetPasswordConfirmCode.async';
import { ResetPasswordSetPasswordAsync } from '../ResetPasswordSetPassword/ResetPasswordSetPassword.async';

interface ResetPasswordModalProps {
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
}

const reducers: ReducersList = {
    resetPassword: ResetPasswordReducer,
};

export const ResetPasswordModal = memo((props: ResetPasswordModalProps) => {
    const {
        className,
        isOpen,
        onClose,
    } = props;
    const isСhoosing = useSelector(getResetPasswordMethods);
    const isConfirmationCode = useSelector(getResetPasswordToken);
    const isSettingPassword = useSelector(getUserId);
    const error = useSelector(getResetPasswordServerErrors);
    const validationErrors = useSelector(getResetPasswordValidationErrors);
    const isError = !!error || !!validationErrors.length;
    const { t } = useTranslation();

    const resetsForms = useMemo(() => [
        !isСhoosing.length ? <ResetPasswordAsync /> : null,
        isСhoosing.length && !isConfirmationCode ? <ResetPasswordMethodsAsync /> : null,
        isConfirmationCode && !isSettingPassword ? <ResetPasswordConfirmCodeAsync /> : null,
        isSettingPassword ? <ResetPasswordSetPasswordAsync /> : null,
    ], [isСhoosing, isSettingPassword, isConfirmationCode]);

    const validateErrorTranslates: Record<any, string> = {
        // Ввод номера
        [ResetPasswordValidateErrorTypes.EMPTY_PHONE_ERROR]: t('Введите номер телефона'),
        [ResetPasswordValidateErrorTypes.FORMAT_PHONE_ERROR]: t('С номером телефона что-то не так'),
        // Ввод кода
        [ResetPasswordValidateErrorTypes.EMPTY_CODE_ERROR]: t('Введите код'),
        [ResetPasswordValidateErrorTypes.FORMAT_CODE_ERROR]: t('С кодом что-то не так'),
        // Установка нового пароля
        [ResetPasswordValidateErrorTypes.EMPTY_PASSWORD_ERROR]: t('Введите новый пароль'),
        [ResetPasswordValidateErrorTypes.SYMBOLS_PASSWORD_ERROR]: t('Пароль должен состоять из букв и хоть одной цифры'),
        [ResetPasswordValidateErrorTypes.LENGTH_PASSWORD_ERROR]: t('Недопустимая длина пароля'),
        [ResetPasswordValidateErrorTypes.EMPTY_PASSWORD_CONFIRM_ERROR]: t('Подтвердите новый пароль'),
        [ResetPasswordValidateErrorTypes.INVALID_PASSWORD_CONFIRM_ERROR]: t('Пароли не совпадают'),
    };

    return (
        <Modal
            className={classNames(cls.RegistrationByPhoneModal, {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
            lazy
            size={ModalSizes.BIG}
        >
            <DynamicModuleLoader reducers={reducers}>
                <Suspense fallback={<Loader />}>
                    {resetsForms}
                </Suspense>
                <Popup
                    isMessage={isError}
                    className={cls.popup}
                    theme={PopupTheme.BLUE}
                >
                    {validationErrors.length
                        ? Object.entries(validateErrorTranslates)
                            .filter(([err, text]) => validationErrors.includes(err as ResetPasswordValidateErrorTypes))
                            .map(([err, text]) => (
                                <Text
                                    key={err}
                                    theme={TextTheme.WHITE}
                                    size={TextSize.SSM}
                                >
                                    {text}
                                </Text>
                            ))
                        : (
                            <Text
                                theme={TextTheme.WHITE}
                                size={TextSize.SSM}
                            >
                                {error}
                            </Text>
                        )}
                </Popup>
            </DynamicModuleLoader>
        </Modal>

    );
});
