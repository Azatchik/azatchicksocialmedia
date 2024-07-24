import { classNames, Mods } from 'shared/lib/classNames/classNames';
import {
    ButtonHTMLAttributes, FC, memo, ReactNode,
} from 'react';
import cls from './Button.module.scss';

export enum ButtonTheme {
    PRIMARY = 'primary',
    PRIMARY_BLACK = 'primary_black',
    SECONDARY = 'secondary',
    SECONDARY_BLACK = 'secondary_black',
    CLEAN = 'clean',
    CLEAN_BLUE = 'clean_blue',
    CLEAN_GREY = 'clean_grey',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string;
    theme?: ButtonTheme;
    isHigh?: boolean;
    isWide?: boolean;
    isBig?: boolean;
    isSmall?: boolean;
    isMedium?: boolean;
    isShallow?: boolean;
    square?: boolean;
    isRound?: boolean;
    disabled?: boolean;
    children?: ReactNode;
}

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        theme = ButtonTheme.PRIMARY,
        disabled,
        isWide = false,
        isBig = false,
        isSmall = false,
        isMedium = false,
        isHigh = false,
        isShallow = false,
        isRound = false,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.disabled]: disabled,
        [cls.wide]: isWide,
        [cls.big]: isBig,
        [cls.small]: isSmall,
        [cls.medium]: isMedium,
        [cls.high]: isHigh,
        [cls.shallow]: isShallow,
        [cls.round]: isRound,
    };

    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, [className, cls[theme]])}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
});
