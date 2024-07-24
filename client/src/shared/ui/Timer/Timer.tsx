import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
    memo, MutableRefObject, useEffect, useRef, useState,
} from 'react';
import { getFormatTime } from 'shared/lib/getFormatTime/getFormatTime';
import cls from './Timer.module.scss';

interface TimerProps {
    className?: string;
    seconds: number;
    onClose: () => void;
}

export const Timer = memo((props: TimerProps) => {
    const {
        className,
        seconds,
        onClose,
    } = props;
    const { t } = useTranslation();
    const [remainingSeconds, setRemainingSeconds] = useState<number>(seconds);
    const ref = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

    useEffect(() => {
        const interval = setInterval(() => setRemainingSeconds((prevState) => prevState - 1), 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    if (!remainingSeconds) {
        onClose?.();
        return null;
    }

    return (
        <div className={classNames(cls.Timer, {}, [className])}>
            {getFormatTime(remainingSeconds)}
        </div>
    );
});
