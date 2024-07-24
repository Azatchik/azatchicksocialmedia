import { classNames, Mods } from 'shared/lib/classNames/classNames';
import React, {
    InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from '../Button/Button';
import cls from './Input.module.scss';
import { Icon, IconSizes } from '../Icon/Icon';
import closedEyeIcon from '../../assets/icons/closed-eye.svg';
import openedEyeIcon from '../../assets/icons/opened-eye.svg';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly' | 'size'>

export enum InputSizes {
    PRIMARY_SIZE = 'primary_size',
    WIDE_SIZE = 'wide_size',
}

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    autofocus?: boolean;
    isOptional?: boolean;
    isWrong?: boolean;
    isSecret?: boolean;
    size?: InputSizes;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        placeholder,
        autofocus,
        isOptional = false,
        isWrong = false,
        isSecret = false,
        size = InputSizes.PRIMARY_SIZE,
        ...otherProps
    } = props;
    const { t } = useTranslation('translation');
    const ref = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const [isOpenedEye, setIsOpenedEye] = useState<boolean>(false);

    useEffect(() => {
        if (autofocus) {
            ref.current?.focus();
            setIsFocused(true);
        }
    }, [autofocus]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
        setIsChanged(true);
    };

    const onBlur = () => {
        setIsFocused(false);
    };

    const onFocus = () => {
        setIsFocused(true);
    };

    const onEyeClick = () => {
        setIsOpenedEye((prevState) => !prevState);
    };

    const mods: Mods = {
        [cls.focused]: isFocused || value,
        [cls.wrong]: isWrong,
        [cls.correct]: !isWrong && isChanged,
        [cls.eyePadding]: isSecret,
    };

    return (
        <div className={classNames(cls.Input, mods, [className, cls[size]])}>
            {placeholder && (
                <div className={cls.placeholder}>
                    {placeholder}
                </div>
            )}
            {isOptional && (
                <div className={cls.optional}>
                    {t('Необязательное поле')}
                </div>
            )}
            {isSecret && (
                <Button
                    theme={ButtonTheme.CLEAN}
                    onClick={onEyeClick}
                    className={cls.eyeBtn}
                >
                    <Icon
                        Svg={isOpenedEye ? openedEyeIcon : closedEyeIcon}
                        size={IconSizes.SMALL}
                    />
                </Button>
            )}
            <input
                ref={ref}
                value={value}
                onChange={onChangeHandler}
                className={cls.input}
                onFocus={onFocus}
                onBlur={onBlur}
                type={isSecret && !isOpenedEye ? 'password' : type}
                {...otherProps}
            />
        </div>
    );
});
