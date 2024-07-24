import { classNames } from 'shared/lib/classNames/classNames';
import { CSSProperties, memo, ReactNode } from 'react';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
    className?: string;
    height?: string | number;
    width?: string | number;
    border?: string;
    style?: CSSProperties;
    children?: ReactNode;
}

export const Skeleton = memo((props: SkeletonProps) => {
    const {
        className,
        height,
        width,
        border,
        children,
        style,
    } = props;

    const styles: CSSProperties = {
        width,
        height,
        borderRadius: border,
        ...style,
    };

    return (
        <div
            className={classNames(cls.Skeleton, {}, [className])}
            style={styles}
        >
            {children}
        </div>
    );
});
