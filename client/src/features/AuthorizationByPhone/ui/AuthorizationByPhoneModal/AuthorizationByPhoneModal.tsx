import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { memo, Suspense, useMemo } from 'react';
import { Modal, ModalSizes } from 'shared/ui/Modal/Modal';
import { Loader } from 'shared/ui/Loader/Loader';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { Popup, PopupTheme } from 'shared/ui/Popup/Popup';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { AuthorizationByPhoneValidateErrorTypes } from '../../model/types/AuthorizationByPhoneValidateErrorTypes';
import { getAuthorizationByPhoneValidationErrors } from '../../model/selectors/getAuthorizationByPhone/getAuthorizationByPhone';
import {
    getAuthorizationByPhoneServerErrors,
} from '../../model/selectors/getAuthorizationByPhoneServerErrors/getRegistrationByPhoneServerErrors';
import { AuthorizationByPhoneFormAsync } from '../AuthorizationByPhoneForm/AuthorizationByPhoneForm.async';
import cls from './AuthorizationByPhoneModal.module.scss';
import { AuthorizationByPhoneReducer } from '../../model/slices/AuthorizationByPhoneSlice';

interface AuthorizationByPhoneModalProps {
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
    onOpenReg?: () => void;
    onOpenReset?: () => void;
}

const reducers: ReducersList = {
    authorizationByPhone: AuthorizationByPhoneReducer,
};

export const AuthorizationByPhoneModal = memo((props: AuthorizationByPhoneModalProps) => {
    const {
        className,
        isOpen,
        onClose,
        onOpenReg,
        onOpenReset,
    } = props;
    const { t } = useTranslation();
    const error = useSelector(getAuthorizationByPhoneServerErrors);
    const validationErrors = useSelector(getAuthorizationByPhoneValidationErrors);
    const isError = !!error || !!validationErrors.length;

    const validateErrorTranslates: Record<any, string> = {
        [AuthorizationByPhoneValidateErrorTypes.EMPTY_PHONE_ERROR]: t('Введите номер телефона'),
        [AuthorizationByPhoneValidateErrorTypes.FORMAT_PHONE_ERROR]: t('C номером телефона что-то не так'),
        [AuthorizationByPhoneValidateErrorTypes.EMPTY_PASSWORD_ERROR]: t('Введите пароль'),
    };

    const authorizationByPhoneForm = useMemo(() => (
        <AuthorizationByPhoneFormAsync onOpenReg={onOpenReg} onOpenReset={onOpenReset} />
    ), [onOpenReg, onOpenReset]);

    return (
        <Modal
            className={classNames(cls.AuthorizationByPhoneModal, {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
            lazy
            size={ModalSizes.BIG}
        >
            <DynamicModuleLoader reducers={reducers}>
                <Suspense fallback={<Loader />}>
                    {authorizationByPhoneForm}
                </Suspense>
                <Popup
                    isMessage={isError}
                    className={cls.popup}
                    theme={PopupTheme.BLUE}
                >
                    {validationErrors.length
                        ? Object.entries(validateErrorTranslates)
                            .filter(([err, text]) => validationErrors.includes(err as AuthorizationByPhoneValidateErrorTypes))
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
