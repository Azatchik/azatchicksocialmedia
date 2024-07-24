import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import cls from './Asidebar.module.scss';

interface AsidebarProps {
    className?: string;
}

export const Asidebar = memo((props: AsidebarProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.Asidebar, {}, [className])}>
            Asidebar
        </div>
    );
});
