import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
    memo, MutableRefObject, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { Icon, IconSizes } from 'shared/ui/Icon/Icon';
import mainLogo from 'shared/assets/icons/main-logo.svg';
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
import { fetchAuthentication } from '../../model/services/fetchAuthentication/fetchAuthentication';
import { validateCode } from '../../model/services/validateCode/validateCode';
import {
    getRegistrationByPhoneCode,
    getRegistrationByPhoneCurrentCode,
    getRegistrationByPhonePhone,
} from '../../model/selectors/getRegistrationByPhone/getRegistrationByPhone';
import { RegistrationByPhoneActions } from '../../model/slices/RegistrationByPhoneSlice';
import cls from './ConfirmCodeForm.module.scss';
import { fetchConfirmCode } from '../../model/services/fetchConfirmCode/fetchConfirmCode';

interface ConfirmCodeFormProps {
    className?: string;
}

const ConfirmCodeForm = memo((props: ConfirmCodeFormProps) => {
    const { className } = props;
    const { t } = useTranslation('registration');
    const dispatch = useAppDispatch();
    const code = useSelector(getRegistrationByPhoneCode);
    const phone = useSelector(getRegistrationByPhonePhone);
    const currentCode = useSelector(getRegistrationByPhoneCurrentCode);
    const ref = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
    const [isTimerVisible, setIsTimerVisible] = useState<boolean>(true);
    const [countShowTimer, setCountShowTimer] = useState<number>(0);

    const [isVisiblePrompt, setIsVisiblePrompt] = useState<boolean>(false);

    const wrongInputsRealTime = useMemo(() => ({
        code: false,
    }), []);

    useEffect(() => {
        ref.current = setTimeout(() => {
            setIsVisiblePrompt(true);
            const audio = new Audio(dingSound);
            audio.play();
        }, 6000);

        return () => {
            clearTimeout(ref.current as any);
            setIsVisiblePrompt(false);
        };
    }, [currentCode]);

    const onSetTimerVisible = useCallback(() => {
        setIsTimerVisible(false);
    }, []);

    const fetchAuthenticationAgain = useCallback(() => {
        dispatch(fetchAuthentication());
    }, [dispatch]);

    const debouncedFetchAuthenticationAgain = useDebounce(fetchAuthenticationAgain, 2000);

    const onSendCodeAgainClick = useCallback(async () => {
        setCountShowTimer((prevState) => prevState + 1);
        setIsTimerVisible(true);
        debouncedFetchAuthenticationAgain();
    }, [debouncedFetchAuthenticationAgain]);

    const onConfirmClick = useCallback(() => {
        dispatch(fetchConfirmCode());
    }, [dispatch]);

    const onCancelClick = useCallback(() => {
        dispatch(RegistrationByPhoneActions.clearAll());
    }, [dispatch]);

    const onChangeCode = useCallback((value: string) => {
        const valueCode = value.trim();
        let validationValue;
        if (valueCode.length < code.length) {
            validationValue = valueCode;
        } else if (valueCode.length > 1) {
            validationValue = valueCode;
        } else {
            validationValue = code + valueCode[valueCode.length - 1];
        }
        const isValid = validateCode(validationValue);
        if (isValid.length) {
            wrongInputsRealTime.code = true;
        } else {
            wrongInputsRealTime.code = false;
        }
        dispatch(RegistrationByPhoneActions.setCode(valueCode));
    }, [code, dispatch, wrongInputsRealTime]);

    return (
        <VStack
            className={classNames(cls.ConfirmCodeForm, {}, [className])}
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
                Svg={mainLogo}
                size={IconSizes.MEDIUM}
                className={cls.mainLogo}
            />
            <Text
                theme={TextTheme.GREY}
                size={TextSize.SSM}
            >
                {t('Мы отправили SMS с 6-ти значным кодом')}
            </Text>
            <HStack align="center" gap="4" className={cls.phoneSentCode}>
                <Text
                    theme={TextTheme.GREY}
                    size={TextSize.SSM}
                >
                    {t('на номер')}
                </Text>
                <Text
                    theme={TextTheme.GREY}
                    size={TextSize.M}
                >
                    {`+${phone}`}
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
                                {t('Вы можете запросить SMS с кодом снова')}
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
                            {countShowTimer === 2 ? t('Попробуйте еще раз через 15 минут') : t('Запросить код снова')}
                        </Button>
                    )}
            </VStack>
        </VStack>
    );
});

export default ConfirmCodeForm;
