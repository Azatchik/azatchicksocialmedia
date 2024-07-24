import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
    memo, ReactNode, useEffect, useRef, useState,
} from 'react';
import cls from './Popup.module.scss';

export enum PopupTheme {
    BLUE = 'blue',
    TEAL = 'teal',
}

interface PopupProps {
    className?: string;
    children?: ReactNode | string;
    isMessage?: boolean;
    theme?: PopupTheme;
    delay?: number;
}

const POPUP_VISIBLE_DELAY = 8000;

export const Popup = memo((props: PopupProps) => {
    const {
        className,
        children,
        isMessage,
        theme = PopupTheme.BLUE,
        delay = POPUP_VISIBLE_DELAY,
    } = props;
    const { t } = useTranslation();
    const ref = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [isVisiblePopup, setIsVisiblePopup] = useState<boolean>(false);

    useEffect(() => {
        if (isMessage) {
            setIsVisiblePopup(true);
            ref.current = setTimeout(() => {
                setIsVisiblePopup(false);
            }, delay);
        }

        return () => {
            setIsVisiblePopup(false);
            if (ref.current) {
                clearTimeout(ref.current);
            }
        };
    }, [delay, isMessage]);

    const mods: Mods = {
        [cls.visible]: isVisiblePopup,
    };

    return (
        <div className={classNames(cls.Popup, mods, [className, cls[theme]])}>
            {children}
        </div>
    );
});
