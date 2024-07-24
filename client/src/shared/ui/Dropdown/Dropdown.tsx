import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { HStack, VStack } from '../Stack';
import { TextSize, TextTheme, Text } from '../Text/Text';
import { Icon, IconSizes, IconTheme } from '../Icon/Icon';
import cls from './Dropdown.module.scss';

export interface DropdownItem {
    value: string;
    icon: React.VFC<React.SVGProps<SVGSVGElement>>;
    iconTheme: IconTheme;
    text: string;
}

interface DropdownProps {
    className?: string;
    items: DropdownItem[];
    isVisible?: boolean;
    textTheme?: TextTheme;
    textSize?: TextSize;
    iconSize?: IconSizes;
    onClickItem: (value: string) => void;
}

export const Dropdown = memo((props: DropdownProps) => {
    const {
        className,
        items,
        isVisible = false,
        textTheme = TextTheme.PRIMARY,
        textSize = TextSize.S,
        iconSize = IconSizes.SMALL,
        onClickItem,
    } = props;
    const { t } = useTranslation();

    const onClickHandler = useCallback((value: string) => {
        onClickItem(value);
    }, [onClickItem]);

    const mods: Mods = {
        [cls.isVisible]: isVisible,
    };

    return (
        <VStack
            className={classNames(cls.Dropdown, mods, [className])}
        >
            {items.map((item) => (
                <HStack
                    onClick={() => onClickHandler(item.value)}
                    align="center"
                    gap="8"
                    className={cls.item}
                    maxW
                    key={item.value}
                >
                    <Icon
                        Svg={item.icon}
                        theme={item.iconTheme}
                        size={iconSize}
                    />
                    <Text
                        theme={textTheme}
                        size={textSize}
                        noWrap
                    >
                        {item.text}
                    </Text>
                </HStack>
            ))}
        </VStack>
    );
});
