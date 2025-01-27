import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { CSSProperties, useMemo } from 'react';
import cls from './Avatar.module.scss';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
}

export const Avatar = ({
    className, src, size,
}: AvatarProps) => {
    const mods: Mods = {};

    const styles = useMemo<CSSProperties>(() => ({
        width: size || 100,
        height: size || 100,
        minHeight: size || 100,
        minWidth: size || 100,
        backgroundImage: `url(${src})`,
    }), [size, src]);

    return (
        <div
            style={styles}
            className={classNames(cls.Avatar, mods, [className])}
        />
    );
};
