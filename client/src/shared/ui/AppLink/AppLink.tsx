import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Link, LinkProps, useLocation } from 'react-router-dom';
import { memo, ReactNode } from 'react';
import cls from './AppLink.module.scss';
import { Icon, IconSizes, IconTheme } from '../Icon/Icon';

export enum AppLinkSizes {
    SMALL = 'small',
    MEDIUM = 'medium',
    BIG = 'big',
}

export enum AppLinkTheme {
    PRIMARY = 'primary',
    PRIMARY_BLACK = 'primary_black',
    CLEAN = 'clean',
    CLEAN_BLUE = 'clean_blue',
    UNTHEME = 'untheme',
    PANEL = 'panel',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
    children?: string | ReactNode;
    icon?: React.VFC<React.SVGProps<SVGSVGElement>>;
    iconFill?: React.VFC<React.SVGProps<SVGSVGElement>>;
    size?: AppLinkSizes;
    isLink?: boolean;
    isBold?: boolean;
}

export const AppLink = memo((props: AppLinkProps) => {
    const {
        to,
        className,
        children,
        theme = AppLinkTheme.PRIMARY,
        icon,
        size = AppLinkSizes.SMALL,
        isLink = false,
        iconFill,
        isBold = false,
        ...otherProps
    } = props;
    const location = useLocation();

    const additional = [
        className,
        cls[theme],
        cls[size],
    ];

    const isSelected = isLink && location.pathname === to;

    const mods: Mods = {
        [cls.selected]: isSelected,
        [`${cls.size}-bold`]: isBold,
    };

    return (
        <Link
            to={to}
            className={classNames(cls.AppLink, mods, additional)}
            {...otherProps}
        >
            {icon && iconFill && isLink && (
                <Icon
                    Svg={isSelected ? iconFill : icon}
                    size={IconSizes.SMALL}
                    theme={IconTheme.LINK}
                    className={cls.icon}
                />
            )}
            {icon && !isLink && (
                <Icon
                    Svg={icon}
                    size={IconSizes.SMALL}
                    className={cls.icon}
                />
            )}
            {children}
        </Link>
    );
});
