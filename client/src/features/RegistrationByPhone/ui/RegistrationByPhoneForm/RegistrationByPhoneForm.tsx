import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { Input, InputSizes } from 'shared/ui/Input/Input';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { HStack, VStack } from 'shared/ui/Stack';
import { Icon, IconSizes } from 'shared/ui/Icon/Icon';
import mainLogo from 'shared/assets/icons/main-logo.svg';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { validatePhone } from '../../model/services/validatePhone/validatePhone';
import { getRegistrationByPhonePhone } from '../../model/selectors/getRegistrationByPhone/getRegistrationByPhone';
import { fetchAuthentication } from '../../model/services/fetchAuthentication/fetchAuthentication';
import cls from './RegistrationByPhoneForm.module.scss';
import { RegistrationByPhoneActions } from '../../model/slices/RegistrationByPhoneSlice';

interface RegistrationByPhoneFormProps {
    className?: string;
    onOpenAuth?: () => void;
}

const RegistrationByPhoneForm = memo((props: RegistrationByPhoneFormProps) => {
    const {
        className,
        onOpenAuth,
    } = props;
    const { t } = useTranslation('registration');
    const dispatch = useAppDispatch();
    const phone = useSelector(getRegistrationByPhonePhone);

    const wrongInputsRealTime = useMemo(() => ({
        phone: false,
    }), []);

    const fetchAuthenticationFunc = useCallback(() => {
        dispatch(fetchAuthentication());
    }, [dispatch]);

    const debouncedFetchAuthentication = useDebounce(fetchAuthenticationFunc, 500);

    const onNextClick = useCallback(() => {
        debouncedFetchAuthentication();
    }, [debouncedFetchAuthentication]);

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
        dispatch(RegistrationByPhoneActions.setPhone(valuePhone));
    }, [dispatch, phone, wrongInputsRealTime]);

    return (
        <VStack
            className={classNames(cls.RegistrationByPhoneForm, {}, [className])}
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
                <Text size={TextSize.ML} className={cls.entrance}>{t('Регистрация')}</Text>
                <Input
                    placeholder={t('Номер телефона')}
                    value={`+${phone}`}
                    onChange={onChangePhone}
                    isWrong={wrongInputsRealTime.phone}
                    size={InputSizes.WIDE_SIZE}
                />
                <Button
                    theme={ButtonTheme.PRIMARY_BLACK}
                    onClick={onNextClick}
                    isWide
                >
                    {t('Далее')}
                </Button>
            </VStack>
            <HStack gap="4" className={cls.regRecommendation}>
                <Text
                    size={TextSize.SSM}
                    theme={TextTheme.GREY}
                >
                    {`${t('Уже зарегистрированы')}?`}
                </Text>
                <Button
                    theme={ButtonTheme.CLEAN_BLUE}
                    onClick={onOpenAuth}
                >
                    {t('Войти')}
                </Button>
            </HStack>
        </VStack>
    );
});

export default RegistrationByPhoneForm;
