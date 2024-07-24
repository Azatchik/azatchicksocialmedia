import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Loader.module.scss';

export enum LoaderSizes {
    MEDIUM_SIZE = 'medium_size',
    SMALL_SIZE = 'small_size',
}

interface LoaderProps {
    className?: string;
    size?: LoaderSizes;
}

export const Loader = ({ className, size = LoaderSizes.MEDIUM_SIZE }: LoaderProps) => (
    <div className={classNames(cls.ldsEllipsis, {}, [className, cls[size]])}>
        <div className={cls.dot1} />
        <div className={cls.dot2} />
        <div className={cls.dot3} />
        <div className={cls.dot4} />
    </div>
);
