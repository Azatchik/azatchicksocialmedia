import { classNames, Mods } from 'shared/lib/classNames/classNames';
import {
    ChangeEvent, memo, useMemo, useState,
} from 'react';
import cls from './Select.module.scss';

export enum SelectSizes {
    DAY_SIZE = 'day_size',
    MONTH_SIZE = 'month_size',
    YEAR_SIZE = 'year_size',
}

export interface SelectOption {
    value: string;
    content: string;
}

interface SelectProps {
    className?: string;
    label?: string;
    options?: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    readonly?: boolean;
    size?: SelectSizes;
}

export const Select = memo((props: SelectProps) => {
    const {
        className,
        label,
        options,
        onChange,
        value,
        readonly,
        size = SelectSizes.DAY_SIZE,
    } = props;
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    const onFocus = () => {
        setIsFocused(true);
    };

    const onBlur = () => {
        setIsFocused(false);
    };

    const optionsList = useMemo(() => options?.map((opt) => (
        <option
            className={cls.option}
            value={opt.value}
            key={opt.value}
        >
            {opt.content}
        </option>
    )), [options]);

    const mods: Mods = {
        [cls.focused]: isFocused,
    };

    return (
        <div className={classNames(cls.Wrapper, mods, [className, cls[size]])}>
            {label && (
                <span className={cls.label}>
                    {`${label}`}
                </span>
            )}
            <select
                disabled={readonly}
                className={cls.select}
                value={value}
                onChange={onChangeHandler}
                onFocus={onFocus}
                onBlur={onBlur}
            >
                {optionsList}
            </select>
        </div>
    );
});
