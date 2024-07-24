import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { HStack, VStack } from 'shared/ui/Stack';
import { Icon, IconSizes } from 'shared/ui/Icon/Icon';
import mainLogo from 'shared/assets/icons/main-logo.svg';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { fetchAuthorization } from '../../model/services/fetchAuthorization/fetchAuthorization';
import {
    getAuthorizationByPhonePassword,
    getAuthorizationByPhonePhone,
} from '../../model/selectors/getAuthorizationByPhone/getAuthorizationByPhone';
import { validatePhone } from '../../model/services/validatePhone/validatePhone';
import { validatePassword } from '../../model/services/validatePassword/validatePassword';
import cls from './AuthorizationByPhoneForm.module.scss';
import { AuthorizationByPhoneActions } from '../../model/slices/AuthorizationByPhoneSlice';

interface AuthorizationByPhoneFormProps {
    className?: string;
    onOpenReg?: () => void;
    onOpenReset?: () => void;
}

const AuthorizationByPhoneForm = memo((props: AuthorizationByPhoneFormProps) => {
    const {
        className,
        onOpenReg,
        onOpenReset,
    } = props;
    const { t } = useTranslation('authorization');
    const dispatch = useAppDispatch();
    const phone = useSelector(getAuthorizationByPhonePhone);
    const password = useSelector(getAuthorizationByPhonePassword);

    const wrongInputsRealTime = useMemo(() => ({
        phone: false,
        password: false,
    }), []);

    const fetchAuthorizationFunc = useCallback(() => {
        dispatch(fetchAuthorization());
    }, [dispatch]);

    const debouncedFetchAuthorization = useDebounce(fetchAuthorizationFunc, 500);

    const onNextClick = useCallback(() => {
        debouncedFetchAuthorization();
    }, [debouncedFetchAuthorization]);

    const onRegClick = useCallback(() => {
        onOpenReg?.();
    }, [onOpenReg]);

    const onForgetClick = useCallback(() => {
        onOpenReset?.();
    }, [onOpenReset]);

    const onChangePhone = useCallback((value: string) => {
        const valuePhone = value.replace('+', '');
        let validationValue;
        if (valuePhone.length < phone.length) {
            validationValue = valuePhone;
        } else if (valuePhone.length > 1) {
            validationValue = valuePhone;
        } else {
            validationValue = phone + valuePhone[valuePhone.length - 1];
        }
        const isValid = validatePhone(validationValue);
        if (isValid.length) {
            wrongInputsRealTime.phone = true;
        } else {
            wrongInputsRealTime.phone = false;
        }
        dispatch(AuthorizationByPhoneActions.setPhone(valuePhone));
    }, [dispatch, phone, wrongInputsRealTime]);

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
        } else {
            wrongInputsRealTime.password = false;
        }
        dispatch(AuthorizationByPhoneActions.setPassword(value));
    }, [dispatch, password, wrongInputsRealTime]);

    return (
        <VStack
            className={classNames(cls.AuthorizationByPhoneForm, {}, [className])}
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
                <Text size={TextSize.ML} className={cls.entrance}>{t('Вход')}</Text>
                <Input
                    placeholder={t('Номер телефона')}
                    onChange={onChangePhone}
                    value={`+${phone}`}
                    isWrong={wrongInputsRealTime.phone}
                />
                <Input
                    placeholder={t('Пароль')}
                    onChange={onChangePassword}
                    value={password}
                    isWrong={wrongInputsRealTime.password}
                    isSecret
                />
                <Button
                    theme={ButtonTheme.PRIMARY_BLACK}
                    onClick={onNextClick}
                >
                    {t('Далее')}
                </Button>
                <Button
                    theme={ButtonTheme.SECONDARY_BLACK}
                    onClick={onForgetClick}
                >
                    {`${t('Забыли пароль')}?`}
                </Button>
            </VStack>
            <HStack gap="4" className={cls.regRecommendation}>
                <Text
                    size={TextSize.SSM}
                    theme={TextTheme.GREY}
                >
                    {`${t('Нет учетной записи')}?`}
                </Text>
                <Button
                    theme={ButtonTheme.CLEAN_BLUE}
                    onClick={onRegClick}
                >
                    {t('Зарегистрироваться')}
                </Button>
            </HStack>
        </VStack>
    );
});

export default AuthorizationByPhoneForm;
