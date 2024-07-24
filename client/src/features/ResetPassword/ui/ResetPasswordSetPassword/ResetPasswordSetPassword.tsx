import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { Icon, IconSizes } from 'shared/ui/Icon/Icon';
import openedLockIcon from 'shared/assets/icons/opened-lock.svg';
import { VStack } from 'shared/ui/Stack';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Input, InputSizes } from 'shared/ui/Input/Input';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { UserActions } from 'entities/User';
import { fetchResetPassword } from '../../model/services/fetchResetPassword/fetchResetPassword';
import { ResetPasswordActions } from '../../model/slices/ResetPasswordSlice';
import {
    getResetPasswordPassword,
    getResetPasswordPasswordConfirm,
} from '../../model/selectors/getResetPassword/getResetPassword';
import { validatePasswordConfirm } from '../../model/services/validatePasswordConfirm/validatePasswordConfirm';
import { validatePassword } from '../../model/services/validatePassword/validatePassword';
import cls from './ResetPasswordSetPassword.module.scss';

interface ResetPasswordSetPasswordProps {
    className?: string;
}

const ResetPasswordSetPassword = memo((props: ResetPasswordSetPasswordProps) => {
    const { className } = props;
    const { t } = useTranslation('resetPassword');
    const dispatch = useAppDispatch();
    const password = useSelector(getResetPasswordPassword);
    const passwordConfirm = useSelector(getResetPasswordPasswordConfirm);

    const wrongInputsRealTime = useMemo(() => ({
        password: false,
        passwordConfirm: false,
    }), []);

    const onNextClick = useCallback(() => {
        const result = dispatch(fetchResetPassword());
    }, [dispatch]);

    const onCancelClick = useCallback(() => {
        dispatch(UserActions.clearUser());
        dispatch(ResetPasswordActions.clearAll());
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        let validationValue;
        if (value.length < password.length) {
            validationValue = value;
        } else if (value.length > 1) {
            validationValue = value;
        } else {
            validationValue = password + value[value.length - 1];
        }
        const isValid = validatePassword(validationValue);
        if (isValid.length) {
            wrongInputsRealTime.password = true;
            wrongInputsRealTime.passwordConfirm = true;
        } else {
            wrongInputsRealTime.password = false;
            wrongInputsRealTime.passwordConfirm = validationValue !== passwordConfirm;
        }
        dispatch(ResetPasswordActions.setPassword(value));
    }, [dispatch, password, passwordConfirm, wrongInputsRealTime]);

    const onChangePasswordConfirm = useCallback((value: string) => {
        let validationValue;
        if (value.length < passwordConfirm.length) {
            validationValue = value;
        } else if (value.length > 1) {
            validationValue = value;
        } else {
            validationValue = passwordConfirm + value[value.length - 1];
        }
        const isValid = validatePasswordConfirm(validationValue, password);
        if (isValid.length || wrongInputsRealTime.password) {
            wrongInputsRealTime.passwordConfirm = true;
        } else {
            wrongInputsRealTime.passwordConfirm = false;
        }
        dispatch(ResetPasswordActions.setPasswordConfirm(value));
    }, [dispatch, password, passwordConfirm, wrongInputsRealTime]);

    return (
        <VStack
            className={classNames(cls.ResetPasswordSetPassword, {}, [className])}
            align="center"
            justify="start"
            maxH
        >
            <Icon
                Svg={openedLockIcon}
                size={IconSizes.MEDIUM}
                className={cls.lockIcon}
            />
            <VStack gap="24" align="center">
                <Text size={TextSize.ML} className={cls.entrance}>{t('Установка нового пароля')}</Text>
                <Input
                    placeholder={t('Новый пароль')}
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

export default ResetPasswordSetPassword;
