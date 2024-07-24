import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { Input, InputSizes } from 'shared/ui/Input/Input';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';
import { Icon, IconSizes } from 'shared/ui/Icon/Icon';
import closedLockIcon from 'shared/assets/icons/closed-lock.svg';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { getResetPasswordPhone } from '../../model/selectors/getResetPassword/getResetPassword';
import { fetchMethods } from '../../model/services/fetchMethods/fetchMethods';
import { validatePhone } from '../../model/services/validatePhone/validatePhone';
import cls from './ResetPassword.module.scss';
import { ResetPasswordActions } from '../../model/slices/ResetPasswordSlice';

interface ResetPasswordProps {
    className?: string;
}

const ResetPassword = memo((props: ResetPasswordProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('resetPassword');
    const dispatch = useAppDispatch();
    const phone = useSelector(getResetPasswordPhone);

    const wrongInputsRealTime = useMemo(() => ({
        phone: false,
    }), []);

    const fetchResetFunc = useCallback(() => {
        dispatch(fetchMethods());
    }, [dispatch]);

    const debouncedFetchReset = useDebounce(fetchResetFunc, 500);

    const onNextClick = useCallback(() => {
        debouncedFetchReset();
    }, [debouncedFetchReset]);

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
        dispatch(ResetPasswordActions.setPhone(valuePhone));
    }, [dispatch, phone, wrongInputsRealTime]);

    return (
        <VStack
            className={classNames(cls.ResetPassword, {}, [className])}
            align="center"
            justify="start"
            maxH
        >
            <Icon
                Svg={closedLockIcon}
                size={IconSizes.MEDIUM}
                className={cls.lockIcon}
            />
            <VStack gap="24" align="center">
                <Text size={TextSize.ML} className={cls.entrance}>{t('Восстановление доступа')}</Text>
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
        </VStack>
    );
});

export default ResetPassword;
