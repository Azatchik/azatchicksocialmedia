import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
    memo, MutableRefObject, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { Icon, IconSizes } from 'shared/ui/Icon/Icon';
import closedLockIcon from 'shared/assets/icons/closed-lock.svg';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Timer } from 'shared/ui/Timer/Timer';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { Popup, PopupTheme } from 'shared/ui/Popup/Popup';
import dingSound from 'shared/assets/sounds/ding.mp3';
import {
    getResetPasswordCode,
    getResetPasswordCurrentCode,
    getResetPasswordMethod,
} from '../../model/selectors/getResetPassword/getResetPassword';
import { fetchCode } from '../../model/services/fetchCode/fetchCode';
import { fetchConfirmResetCode } from '../../model/services/fetchConfirmResetCode/fetchConfirmResetCode';
import { ResetPasswordActions } from '../../model/slices/ResetPasswordSlice';
import { validateCode } from '../../model/services/validateCode/validateCode';
import cls from './ResetPasswordConfirmCode.module.scss';

interface ResetPasswordConfirmCodeProps {
    className?: string;
}

function maskAllButLastFour(str: string) {
    return str.slice(0, -4).replace(/./g, '*') + str.slice(-4);
}

const ResetPasswordConfirmCode = memo((props: ResetPasswordConfirmCodeProps) => {
    const { className } = props;
    const { t } = useTranslation('resetPassword');
    const dispatch = useAppDispatch();
    const code = useSelector(getResetPasswordCode);
    const method = useSelector(getResetPasswordMethod);
    const currentCode = useSelector(getResetPasswordCurrentCode);
    const ref = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
    const [isTimerVisible, setIsTimerVisible] = useState<boolean>(true);
    const [countShowTimer, setCountShowTimer] = useState<number>(0);

    const [isVisiblePrompt, setIsVisiblePrompt] = useState<boolean>(false);

    const wrongInputsRealTime = useMemo(() => ({
        code: false,
    }), []);

    useEffect(() => {
        if (currentCode) {
            ref.current = setTimeout(() => {
                setIsVisiblePrompt(true);
                const audio = new Audio(dingSound);
                audio.play();
            }, 6000);
        }

        return () => {
            clearTimeout(ref.current as any);
            setIsVisiblePrompt(false);
        };
    }, [currentCode]);

    const onSetTimerVisible = useCallback(() => {
        setIsTimerVisible(false);
    }, []);

    const fetchResetCodeAgain = useCallback(() => {
        dispatch(fetchCode());
    }, [dispatch]);

    const debouncedFetchResetCodeAgain = useDebounce(fetchResetCodeAgain, 2000);

    const onSendCodeAgainClick = useCallback(async () => {
        setCountShowTimer((prevState) => prevState + 1);
        setIsTimerVisible(true);
        debouncedFetchResetCodeAgain();
    }, [debouncedFetchResetCodeAgain]);

    const onConfirmClick = useCallback(() => {
        dispatch(fetchConfirmResetCode());
    }, [dispatch]);

    const onCancelClick = useCallback(() => {
        dispatch(ResetPasswordActions.clearAll());
    }, [dispatch]);

    const onChangeCode = useCallback((value: string) => {
        const valueCode = value.trim();
        let validationValue;
        if (valueCode.length < code.length) {
            validationValue = valueCode;
        } else if (valueCode.length > 1) {
            validationValue = value;
        } else {
            validationValue = code + valueCode[valueCode.length - 1];
        }
        const isValid = validateCode(validationValue);
        if (isValid.length) {
            wrongInputsRealTime.code = true;
        } else {
            wrongInputsRealTime.code = false;
        }
        dispatch(ResetPasswordActions.setCode(valueCode));
    }, [code, dispatch, wrongInputsRealTime]);

    return (
        <VStack
            className={classNames(cls.ResetPasswordConfirmCode, {}, [className])}
            align="center"
            justify="start"
            maxH
        >
            {isVisiblePrompt && (
                <Popup
                    theme={PopupTheme.TEAL}
                    isMessage
                    className={cls.promptCode}
                    delay={20 * 1000}
                >
                    {`${t('Azatchik_social_media: Ваш код подтверждения, никому не передавайте код')}! ${t('Код')}: ${currentCode}`}
                </Popup>
            )}
            <Icon
                Svg={closedLockIcon}
                size={IconSizes.MEDIUM}
                className={cls.lockIcon}
            />
            <Text
                theme={TextTheme.GREY}
                size={TextSize.SSM}
            >
                {currentCode ? t('Мы отправили SMS с 6-ти значным кодом') : t('Мы отправили письмо с 6-ти значным кодом')}
            </Text>
            <HStack align="center" gap="4" className={cls.phoneSentCode}>
                <Text
                    theme={TextTheme.GREY}
                    size={TextSize.SSM}
                >
                    {currentCode ? t('на номер') : t('на электронный адрес')}
                </Text>
                <Text
                    theme={TextTheme.GREY}
                    size={TextSize.M}
                >
                    {currentCode
                        ? `+${maskAllButLastFour(method)}`
                        : `${maskAllButLastFour(method.split('@')[0])}${method.split('@')[1]}`}
                </Text>
            </HStack>
            <VStack gap="24" align="center">
                <Text size={TextSize.ML} className={cls.entrance}>{t('Подтверждение кода')}</Text>
                <Input
                    placeholder={t('Код')}
                    value={code}
                    onChange={onChangeCode}
                    isWrong={wrongInputsRealTime.code}
                />
                <Button
                    theme={ButtonTheme.PRIMARY_BLACK}
                    onClick={onConfirmClick}
                >
                    {t('Подтвердить')}
                </Button>
                <Button
                    theme={ButtonTheme.SECONDARY_BLACK}
                    onClick={onCancelClick}
                >
                    {t('Отмена')}
                </Button>
                {isTimerVisible
                    ? (
                        <VStack align="center">
                            <Text
                                theme={TextTheme.GREY}
                                size={TextSize.SSM}
                            >
                                {currentCode ? t('Вы можете запросить SMS с кодом снова') : t('Вы можете запросить письмо с кодом снова')}
                            </Text>
                            <HStack align="center" gap="4">
                                <Text
                                    theme={TextTheme.GREY}
                                    size={TextSize.SSM}
                                >
                                    {t('через')}
                                </Text>
                                <Timer onClose={onSetTimerVisible} seconds={70} />
                            </HStack>
                        </VStack>
                    )
                    : (
                        <Button
                            theme={ButtonTheme.CLEAN_BLUE}
                            onClick={onSendCodeAgainClick}
                            disabled={countShowTimer === 2}
                            className={cls.sendCodeAgainBtn}
                        >
                            {countShowTimer === 2 ? t('Попробуйте еще раз через 15 минут, либо смените способ') : t('Запросить код снова')}
                        </Button>
                    )}
            </VStack>
        </VStack>
    );
});

export default ResetPasswordConfirmCode;
