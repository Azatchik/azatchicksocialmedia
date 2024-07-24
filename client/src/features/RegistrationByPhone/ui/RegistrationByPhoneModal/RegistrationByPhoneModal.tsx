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
import { RegistrationByPhoneValidateErrorTypes } from '../../model/types/RegistrationByPhoneValidateErrorTypes';
import {
    getRegistrationByPhoneServerErrors,
} from '../../model/selectors/getRegistrationByPhoneServerErrors/getRegistrationByPhoneServerErrors';
import {
    getRegistrationByPhoneToken,
    getRegistrationByPhoneValidationErrors,
} from '../../model/selectors/getRegistrationByPhone/getRegistrationByPhone';
import { RegistrationByPhoneReducer } from '../../model/slices/RegistrationByPhoneSlice';
import { SetPasswordFormAsync } from '../SetPasswordForm/SetPasswordForm.async';
import { RegistrationByPhoneFormAsync } from '../RegistrationByPhoneForm/RegistrationByPhone.async';
import cls from './RegistrationByPhoneModal.module.scss';
import { ConfirmCodeFormAsync } from '../ConfirmCodeForm/ConfirmCodeForm.async';

interface RegistrationByPhoneModalProps {
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
    onOpenAuth?: () => void;
}

const reducers: ReducersList = {
    registrationByPhone: RegistrationByPhoneReducer,
};

export const RegistrationByPhoneModal = memo((props: RegistrationByPhoneModalProps) => {
    const {
        className,
        isOpen,
        onClose,
        onOpenAuth,
    } = props;
    const isConfirmationCode = useSelector(getRegistrationByPhoneToken);
    const isSettingPassword = useSelector(getUserId);
    const error = useSelector(getRegistrationByPhoneServerErrors);
    const validationErrors = useSelector(getRegistrationByPhoneValidationErrors);
    const isError = !!error || !!validationErrors.length;
    const { t } = useTranslation();

    const registrationByPhoneForms = useMemo(() => [
        !isConfirmationCode && !isSettingPassword && <RegistrationByPhoneFormAsync onOpenAuth={onOpenAuth} />,
        isConfirmationCode && !isSettingPassword && <ConfirmCodeFormAsync />,
        isSettingPassword && <SetPasswordFormAsync />,
    ], [isConfirmationCode, isSettingPassword, onOpenAuth]);

    const validateErrorTranslates: Record<any, string> = {
        // Регистрация
        [RegistrationByPhoneValidateErrorTypes.EMPTY_PHONE_ERROR]: t('Введите номер телефона'),
        [RegistrationByPhoneValidateErrorTypes.FORMAT_PHONE_ERROR]: t('С номером телефона что-то не так'),
        [RegistrationByPhoneValidateErrorTypes.EMPTY_CODE_ERROR]: t('Введите код'),
        [RegistrationByPhoneValidateErrorTypes.FORMAT_CODE_ERROR]: t('С кодом что-то не так'),
        [RegistrationByPhoneValidateErrorTypes.FORMAT_EMAIL_ERROR]: t('Неверный формат электронной почты'),
        [RegistrationByPhoneValidateErrorTypes.EMPTY_PASSWORD_ERROR]: t('Введите пароль'),
        [RegistrationByPhoneValidateErrorTypes.SYMBOLS_PASSWORD_ERROR]: t('Пароль должен состоять из букв и хоть одной цифры'),
        [RegistrationByPhoneValidateErrorTypes.LENGTH_PASSWORD_ERROR]: t('Недопустимая длина пароля'),
        [RegistrationByPhoneValidateErrorTypes.EMPTY_PASSWORD_CONFIRM_ERROR]: t('Подтвердите пароль'),
        [RegistrationByPhoneValidateErrorTypes.INVALID_PASSWORD_CONFIRM_ERROR]: t('Пароли не совпадают'),
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
                    {registrationByPhoneForms}
                </Suspense>
                <Popup
                    isMessage={isError}
                    className={cls.popup}
                    theme={PopupTheme.BLUE}
                >
                    {validationErrors.length
                        ? Object.entries(validateErrorTranslates)
                            .filter(([err, text]) => validationErrors.includes(err as RegistrationByPhoneValidateErrorTypes))
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
