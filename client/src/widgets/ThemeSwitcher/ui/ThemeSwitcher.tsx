import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, useEffect, useState } from 'react';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { Icon, IconSizes, IconTheme } from 'shared/ui/Icon/Icon';
import sunIcon from 'shared/assets/icons/sun.svg';
import moonIcon from 'shared/assets/icons/moon.svg';
import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();
    const [isChecked, setIsChecked] = useState(false);
    const [isInit, setIsInit] = useState(false);

    useEffect(() => {
        if (theme === Theme.DARK) {
            setIsChecked(true);
        }
        setIsInit(true);
    }, [theme]);

    const onToggle = () => {
        toggleTheme();
        setIsChecked((prevState) => !prevState);
    };

    if (!isInit) {
        return null;
    }

    return (
        <div
            className={classNames(cls.toggleWrapper, { [cls.checked]: isChecked }, [className])}
            onClick={onToggle}
        >
            <div className={cls.toggleHandler}>
                <Icon
                    Svg={isChecked ? moonIcon : sunIcon}
                    className={cls.icon}
                    theme={IconTheme.SECONDARY}
                    size={IconSizes.SMALL}
                />
            </div>
        </div>
    );
});
