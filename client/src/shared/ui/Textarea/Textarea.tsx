import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, {
    CSSProperties, memo, useCallback, useEffect, useState,
} from 'react';
import { Text, TextSize, TextTheme } from '../Text/Text';
import { HStack } from '../Stack';
import cls from './Textarea.module.scss';
import { FlexGap, FlexJustify } from '../Stack/Flex/Flex';

interface TextareaProps {
    className?: string;
    gap?: FlexGap;
    placeholder?: string;
    placeholderTheme?: TextTheme;
    onChange?: (value: string) => void;
    value: string;
    maxW?: boolean;
    justify?: FlexJustify;
}

export const Textarea = memo((props: TextareaProps) => {
    const {
        className,
        gap,
        placeholder,
        placeholderTheme = TextTheme.GREY,
        onChange,
        value,
        maxW = false,
        justify = 'start',
    } = props;
    const { t } = useTranslation();
    const [rows, setRows] = useState(5);

    useEffect(() => {
        const rowsCoefficient = Math.floor(value.length / 58);
        if (rowsCoefficient > rows) {
            setRows((prevState) => rowsCoefficient);
        }
    }, []);

    const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const rowsCoefficient = Math.floor(e.target.value.length / 58);
        if (rowsCoefficient > rows) {
            setRows((prevState) => rowsCoefficient);
        } else if (rowsCoefficient < rows) {
            setRows((prevState) => rowsCoefficient + 5);
        }
        onChange?.(e.target.value);
    }, [onChange, rows]);

    const style: CSSProperties = {
        minHeight: `${rows * 20}px`,
    };

    return (
        <HStack
            className={classNames(cls.TextareaWrapper, {}, [className])}
            gap={gap}
            maxW={maxW}
            justify={justify}
            align="start"
        >
            {placeholder && (
                <Text
                    theme={placeholderTheme}
                    size={TextSize.SSM}
                >
                    {`${placeholder}:`}
                </Text>
            )}
            <textarea
                className={cls.textArea}
                onChange={onChangeHandler}
                defaultValue={value}
                spellCheck="false"
                style={style}
                rows={rows}
            />
        </HStack>
    );
});
