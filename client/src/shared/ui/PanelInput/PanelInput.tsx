import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { HStack } from '../Stack';
import { FlexGap, FlexJustify } from '../Stack/Flex/Flex';
import { Text, TextSize, TextTheme } from '../Text/Text';
import cls from './PanelInput.module.scss';

interface PanelInputProps {
    className?: string;
    gap?: FlexGap;
    placeholder?: string;
    innerPlaceholder?: string;
    placeholderTheme?: TextTheme;
    onChange?: (value: string) => void;
    value: string;
    maxW?: boolean;
    maxWInput?: boolean;
    justify?: FlexJustify;
}

export const PanelInput = memo((props: PanelInputProps) => {
    const {
        className,
        gap,
        placeholder,
        placeholderTheme = TextTheme.GREY,
        onChange,
        value,
        maxW = false,
        maxWInput = false,
        justify = 'start',
        innerPlaceholder = '',
    } = props;
    const { t } = useTranslation();

    const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    }, [onChange]);

    return (
        <HStack
            className={classNames(cls.PanelInputWrapper, { [cls.maxWInput]: maxWInput }, [className])}
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
            <input
                type="text"
                className={cls.input}
                onChange={onChangeHandler}
                value={value}
                placeholder={innerPlaceholder}
            />
        </HStack>
    );
});
