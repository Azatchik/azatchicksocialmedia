import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { Input, InputSizes } from 'shared/ui/Input/Input';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { HStack, VStack } from 'shared/ui/Stack';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Select, SelectSizes } from 'shared/ui/Select/Select';
import { MonthSelect } from 'entities/Month';
import { UserActions } from 'entities/User';
import { RegistrationByPhoneActions } from 'features/RegistrationByPhone';
import { validateSecondName } from '../../model/services/validateSecondName/validateSecondName';
import { CreateProfileActions } from '../../model/slices/CreateProfileSlice';
import {
    getCreateProfileBirthDay,
    getCreateProfileBirthMonth,
    getCreateProfileBirthYear,
    getCreateProfileFirstName,
    getCreateProfileSecondName,
} from '../../model/selectors/getCreateProfile/getCreateProfile';
import { fetchCreateProfile } from '../../model/services/fetchCreateProfile/fetchCreateProfile';
import cls from './CreateProfileForm.module.scss';
import { validateFirstName } from '../../model/services/validateFirstName/validateFirstName';

interface CreateProfileFormProps {
    className?: string;
}

const CreateProfileForm = memo((props: CreateProfileFormProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('createProfile');
    const dispatch = useAppDispatch();
    const firstName = useSelector(getCreateProfileFirstName);
    const secondName = useSelector(getCreateProfileSecondName);
    const birthDay = useSelector(getCreateProfileBirthDay);
    const birthMonth = useSelector(getCreateProfileBirthMonth);
    const birthYear = useSelector(getCreateProfileBirthYear);

    const wrongInputsRealTime = useMemo(() => ({
        firstName: false,
        secondName: false,
        birthDay: false,
        birthMonth: false,
        birthYear: false,
    }), []);

    const onNextClick = useCallback(() => {
        dispatch(fetchCreateProfile());
    }, [dispatch]);

    const onCancelClick = useCallback(() => {
        dispatch(UserActions.clearUser());
        dispatch(RegistrationByPhoneActions.clearAll());
    }, [dispatch]);

    const onChangeFirstName = useCallback((value: string) => {
        const valueFirstName = value.trim();
        let validationValue;
        if (valueFirstName.length < firstName.length) {
            validationValue = valueFirstName;
        } else if (valueFirstName.length > 1) {
            validationValue = valueFirstName;
        } else {
            validationValue = firstName + valueFirstName[valueFirstName.length - 1];
        }
        const isValid = validateFirstName(validationValue);
        if (isValid.length) {
            wrongInputsRealTime.firstName = true;
        } else {
            wrongInputsRealTime.firstName = false;
        }
        dispatch(CreateProfileActions.setFirstName(valueFirstName));
    }, [dispatch, firstName, wrongInputsRealTime]);

    const onChangeSecondName = useCallback((value: string) => {
        const valueSecondName = value.trim();
        let validationValue;
        if (valueSecondName.length < secondName.length) {
            validationValue = valueSecondName;
        } else if (valueSecondName.length > 1) {
            validationValue = valueSecondName;
        } else {
            validationValue = secondName + valueSecondName[valueSecondName.length - 1];
        }
        const isValid = validateSecondName(validationValue);
        if (isValid.length) {
            wrongInputsRealTime.secondName = true;
        } else {
            wrongInputsRealTime.secondName = false;
        }
        dispatch(CreateProfileActions.setSecondName(valueSecondName));
    }, [dispatch, secondName, wrongInputsRealTime]);

    const onChangeBirthDay = useCallback((value: string) => {
        dispatch(CreateProfileActions.setBirthDay(value));
    }, [dispatch]);

    const onChangeBirthMonth = useCallback((value: string) => {
        dispatch(CreateProfileActions.setBirthMonth(value));
    }, [dispatch]);

    const onChangeBirthYear = useCallback((value: string) => {
        dispatch(CreateProfileActions.setBirthYear(value));
    }, [dispatch]);

    return (
        <VStack
            className={classNames(cls.CreateProfileForm, {}, [className])}
            align="center"
            justify="start"
            maxH
        >
            <VStack gap="24" align="center">
                <Text size={TextSize.ML} className={cls.entrance}>{t('Данные профиля')}</Text>
                <Input
                    placeholder={t('Имя')}
                    value={firstName}
                    onChange={onChangeFirstName}
                    isWrong={wrongInputsRealTime.firstName}
                    size={InputSizes.WIDE_SIZE}
                />
                <Input
                    placeholder={t('Фамилия')}
                    value={secondName}
                    onChange={onChangeSecondName}
                    isWrong={wrongInputsRealTime.secondName}
                    size={InputSizes.WIDE_SIZE}
                />
                <Text
                    theme={TextTheme.PRIMARY}
                    size={TextSize.M}
                >
                    {t('Дата рождения')}
                </Text>
                <Text
                    theme={TextTheme.GREY}
                    size={TextSize.S}
                    className={cls.profileDataInfo}
                >
                    {t('Эта информация не будет общедоступной. Подтвердите свой '
                        + 'возраст, даже если эта учетная запись предназначена для '
                        + 'компании, домашнего животного и т. д.')}
                </Text>
                <HStack
                    align="center"
                    maxW
                    justify="between"
                >
                    <Select
                        label={t('День')}
                        options={new Array(31).fill(1).map((el, index) => ({
                            value: index < 9 ? `0${index + 1}` : `${index + 1}`,
                            content: `${index + 1}`,
                        }))}
                        size={SelectSizes.DAY_SIZE}
                        onChange={onChangeBirthDay}
                        value={birthDay}
                    />
                    <MonthSelect onChange={onChangeBirthMonth} value={birthMonth} />
                    <Select
                        label={t('Год')}
                        options={new Array(99).fill(1).map((el, index) => ({
                            value: `${index + 1920}`,
                            content: `${index + 1920}`,
                        }))}
                        onChange={onChangeBirthYear}
                        value={birthYear}
                    />
                </HStack>
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

export default CreateProfileForm;
