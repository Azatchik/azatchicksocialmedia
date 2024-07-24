import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { Icon, IconSizes } from 'shared/ui/Icon/Icon';
import mainLogo from 'shared/assets/icons/main-logo.svg';
import { VStack } from 'shared/ui/Stack';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Input, InputSizes } from 'shared/ui/Input/Input';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { UserActions } from 'entities/User';
import { validatePasswordConfirm } from '../../model/services/validatePasswordConfirm/validatePasswordConfirm';
import { validatePassword } from '../../model/services/validatePassword/validatePassword';
import {
    getRegistrationByPhoneEmail,
    getRegistrationByPhonePassword,
    getRegistrationByPhonePasswordConfirm,
} from '../../model/selectors/getRegistrationByPhone/getRegistrationByPhone';
import { fetchSetPassword } from '../../model/services/fetchSetPassword/fetchSetPassword';
import { RegistrationByPhoneActions } from '../../model/slices/RegistrationByPhoneSlice';
import cls from './SetPasswordForm.module.scss';
import { validateEmail } from '../../model/services/validateEmail/validateEmail';

interface SetPasswordFormProps {
    className?: string;
}

const SetPasswordForm = memo((props: SetPasswordFormProps) => {
    const { className } = props;
    const { t } = useTranslation('registration');
    const dispatch = useAppDispatch();
    const email = useSelector(getRegistrationByPhoneEmail);
    const password = useSelector(getRegistrationByPhonePassword);
    const passwordConfirm = useSelector(getRegistrationByPhonePasswordConfirm);

    const wrongInputsRealTime = useMemo(() => ({
        email: false,
        password: false,
        passwordConfirm: false,
    }), []);

    const onNextClick = useCallback(() => {
        dispatch(fetchSetPassword());
    }, [dispatch]);

    const onCancelClick = useCallback(async () => {
        dispatch(UserActions.clearUser());
        dispatch(RegistrationByPhoneActions.clearAll());
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        const valuePassword = value.trim();
        let validationValue;
        if (valuePassword.length < password.length) {
            validationValue = valuePassword;
        } else if (valuePassword.length > 1) {
            validationValue = valuePassword;
        } else {
            validationValue = password + valuePassword[valuePassword.length - 1];
        }
        const isValid = validatePassword(validationValue);
        if (isValid.length) {
            wrongInputsRealTime.password = true;
            wrongInputsRealTime.passwordConfirm = true;
        } else {
            wrongInputsRealTime.password = false;
            wrongInputsRealTime.passwordConfirm = validationValue !== passwordConfirm;
        }
        dispatch(RegistrationByPhoneActions.setPassword(valuePassword));
    }, [dispatch, password, passwordConfirm, wrongInputsRealTime]);

    const onChangePasswordConfirm = useCallback((value: string) => {
        const valuePasswordConfirm = value.trim();
        let validationValue;
        if (valuePasswordConfirm.length < passwordConfirm.length) {
            validationValue = valuePasswordConfirm;
        } else if (valuePasswordConfirm.length > 1) {
            validationValue = valuePasswordConfirm;
        } else {
            validationValue = passwordConfirm + valuePasswordConfirm[valuePasswordConfirm.length - 1];
        }
        const isValid = validatePasswordConfirm(validationValue, password);
        if (isValid.length || wrongInputsRealTime.password) {
            wrongInputsRealTime.passwordConfirm = true;
        } else {
            wrongInputsRealTime.passwordConfirm = false;
        }
        dispatch(RegistrationByPhoneActions.setPasswordConfirm(valuePasswordConfirm));
    }, [dispatch, password, passwordConfirm, wrongInputsRealTime]);

    const onChangeEmail = useCallback((value: string) => {
        const valueEmail = value.trim();
        let validationValue;
        if (valueEmail.length < email.length) {
            validationValue = valueEmail;
        } else if (valueEmail.length > 1) {
            validationValue = valueEmail;
        } else {
            validationValue = email + valueEmail[valueEmail.length - 1];
        }
        const isValid = validateEmail(validationValue);
        if (isValid.length) {
            wrongInputsRealTime.email = true;
        } else {
            wrongInputsRealTime.email = false;
        }
        dispatch(RegistrationByPhoneActions.setEmail(valueEmail));
    }, [dispatch, email, wrongInputsRealTime]);

    return (
        <VStack
            className={classNames(cls.SetPasswordForm, {}, [className])}
            align="center"
            justify="start"
            maxH
        >
            <Icon
                Svg={mainLogo}
                size={IconSizes.MEDIUM}
                className={cls.mainLogo}
            />
            <VStack gap="24" align="center">
                <Text size={TextSize.ML} className={cls.entrance}>{t('Установка пароля')}</Text>
                <Input
                    placeholder={t('Электронная почта')}
                    value={email}
                    onChange={onChangeEmail}
                    isOptional
                    isWrong={wrongInputsRealTime.email}
                    size={InputSizes.WIDE_SIZE}
                />
                <Input
                    placeholder={t('Пароль')}
                    value={password}
                    onChange={onChangePassword}
                    isWrong={wrongInputsRealTime.password}
                    isSecret
                    size={InputSizes.WIDE_SIZE}
                />
                <Input
                    placeholder={t('Подтверждение пароля')}
                    value={passwordConfirm}
                    onChange={onChangePasswordConfirm}
                    isWrong={wrongInputsRealTime.passwordConfirm}
                    isSecret
                    size={InputSizes.WIDE_SIZE}
                />
                <Button
                    theme={ButtonTheme.PRIMARY_BLACK}
                    onClick={onNextClick}
                    isWide
                >
                    {t('Далее')}
                </Button>
                <Button
                    theme={ButtonTheme.SECONDARY_BLACK}
                    onClick={onCancelClick}
                    isWide
                >
                    {t('Отмена')}
                </Button>
            </VStack>
        </VStack>
    );
});

export default SetPasswordForm;
