import { classNames } from 'shared/lib/classNames/classNames';
import {
    CSSProperties, HTMLProps, memo, useMemo,
} from 'react';
import deletedIcon from 'shared/assets/icons/deleted-photo.svg';
import { Icon, IconSizes, IconTheme } from '../Icon/Icon';
import cls from './Image.module.scss';

interface ImageProps {
    className?: string;
    src?: string;
    width?: number | string;
    height?: number | string;
    onClick?: () => void;
    defaultSize?: boolean;
    isDeleted?: boolean;
    style?: CSSProperties;
}

export const Image = memo((props: ImageProps) => {
    const {
        className,
        src,
        width,
        height,
        onClick,
        defaultSize = false,
        isDeleted = false,
        style = {},
    } = props;

    const stylesImg = useMemo<CSSProperties>(() => ({
        width: width || '100%',
        minWidth: width || '100%',
        height: height || '100%',
        minHeight: height || '100%',
        backgroundImage: `url(${src})`,
        backgroundSize: defaultSize ? 'contain' : 'cover',
        ...style,
    }), [defaultSize, src, width, height, style]);

    return (
        <div
            className={classNames(cls.Image, { [cls.isDeleted]: isDeleted }, [className])}
            style={stylesImg}
            onClick={onClick}
        >
            {isDeleted && (
                <Icon
                    Svg={deletedIcon}
                    size={IconSizes.BIG}
                    theme={IconTheme.GREY}
                    className={cls.icon}
                />
            )}
        </div>
    );
});
