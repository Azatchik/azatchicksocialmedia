import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo } from 'react';
import cls from './Icon.module.scss';

export enum IconTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    LINK = 'link',
    UNTHEME = 'untheme',
    PANEL = 'panel',
    GREY = 'grey',
    BLUE = 'blue',
    RED = 'red',
}

export enum IconSizes {
    BIG = 'big',
    SMALL = 'small',
    LOWER_SMALL = 'lower_small',
    LOWER_MEDIUM = 'lower_medium',
    MEDIUM = 'medium',
    HIGHER_SMALL = 'higher_small',
}

interface IconProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    size?: IconSizes;
    theme?: IconTheme;
}

export const Icon = memo((props: IconProps) => {
    const {
        className,
        Svg,
        size = IconSizes.BIG,
        theme = IconTheme.PRIMARY,
        ...otherProps
    } = props;

    return (
        <Svg className={classNames(cls.Icon, {}, [className, cls[size], cls[theme]])} {...otherProps} />
    );
});
