import { classNames, Mods } from 'shared/lib/classNames/classNames';
import React, { memo } from 'react';
import cls from './Text.module.scss';
import { Icon, IconSizes } from '../Icon/Icon';

export enum TextTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    GREY = 'grey',
    WHITE = 'white',
    ERROR = 'error',
    BLUE = 'blue',
}

export enum TextAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center',
}

export enum TextSize {
    SS = 'size_ss',
    S = 'size_s',
    SM = 'size_sm',
    SSM = 'size_ssm',
    M = 'size_m',
    ML = 'size_ml',
    L = 'size_l',
    XL = 'size_xl',
}

interface TextProps {
    className?: string;
    children?: string;
    theme?: TextTheme;
    align?: TextAlign;
    size?: TextSize;
    icon?: React.VFC<React.SVGProps<SVGSVGElement>>;
    iconSize?: IconSizes;
    isBold?: boolean;
    noWrap?: boolean;
    ellipsis?: boolean;
}

type HeaderTagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    [TextSize.SS]: 'h6',
    [TextSize.S]: 'h6',
    [TextSize.SSM]: 'h5',
    [TextSize.SM]: 'h5',
    [TextSize.M]: 'h4',
    [TextSize.ML]: 'h3',
    [TextSize.L]: 'h2',
    [TextSize.XL]: 'h1',
};

export const Text = memo((props: TextProps) => {
    const {
        className,
        isBold = false,
        theme = TextTheme.PRIMARY,
        align = TextAlign.LEFT,
        size = TextSize.SM,
        children,
        icon,
        iconSize = IconSizes.SMALL,
        noWrap = false,
        ellipsis = false,
    } = props;

    const HeaderTag = mapSizeToHeaderTag[size];

    const mods: Mods = {
        [cls[theme]]: true,
        [cls[align]]: true,
        [cls[size]]: true,
        [cls[`${size}-bold`]]: isBold,
        [cls.withIcon]: !!icon,
        [cls.noWrap]: noWrap,
        [cls.ellipsis]: ellipsis,
    };

    return (
        <div className={classNames(cls.Text, mods, [className])}>
            {icon && (
                <Icon
                    Svg={icon}
                    className={cls.icon}
                    size={iconSize}
                />
            )}
            <HeaderTag className={cls.text} data-testid="TextTest">
                {children}
            </HeaderTag>
        </div>
    );
});
