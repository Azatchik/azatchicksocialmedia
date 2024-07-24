import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, {
    CSSProperties, memo, useCallback, useEffect, useState,
} from 'react';
import { getFormatTime } from 'shared/lib/getFormatTime/getFormatTime';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import cls from './Range.module.scss';

interface RangeProps {
    className?: string;
    max: string | number;
    min: string | number;
    width: number;
    currentVolume?: number;
    currentTime?: number;
    onChange: (value: number) => void;
}

export const Range = memo((props: RangeProps) => {
    const {
        className,
        max,
        min,
        width,
        currentVolume = 0,
        currentTime = 0,
        onChange,
        ...otherProps
    } = props;
    const lengthChangeThumb = Number(width) / Number(max);
    const { t } = useTranslation();
    const [value, setValue] = useState(currentTime || currentVolume * 100);
    const [thumbPosition, setThumbPosition] = useState(lengthChangeThumb * value);

    useEffect(() => {
        if (currentTime) {
            setValue(currentTime);
            setThumbPosition(currentTime * lengthChangeThumb);
        }
    }, [currentTime, lengthChangeThumb]);

    const style: CSSProperties = {
        width,
        minWidth: width,
    };

    const styleThumb: CSSProperties = {
        width: `${thumbPosition}px`,
    };

    const styleDuration: CSSProperties = {
        left: `${thumbPosition - 25}px`,
    };

    const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        const newValue = value * lengthChangeThumb;
        setThumbPosition(newValue);
        setValue(value);
        onChange(value);
    }, [lengthChangeThumb, onChange]);

    const onMouseDown = useCallback(() => {
        onChange(value);
    }, [onChange, value]);

    return (
        <div
            className={cls.Range}
            style={style}
            {...otherProps}
        >
            <input
                className={classNames(cls.input, {}, [className])}
                type="range"
                max={max.toString()}
                min={min.toString()}
                onChange={onChangeHandler}
                name="track"
                value={value}
                onMouseDown={onMouseDown}
            />
            <div className={cls.thumb} style={styleThumb} />
            <div className={cls.background} />
            <div className={cls.duration} style={styleDuration}>
                <Text
                    theme={TextTheme.PRIMARY}
                    size={TextSize.S}
                >
                    {currentTime ? getFormatTime(value) : `${value}%`}
                </Text>
            </div>
        </div>
    );
});
