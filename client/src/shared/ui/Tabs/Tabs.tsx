import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, ReactNode, useCallback } from 'react';
import { Card, CardTheme } from '../Card/Card';
import cls from './Tabs.module.scss';

export interface TabItem {
    value: string;
    content: ReactNode;
}

export enum TabsDirection {
    ROW = 'row',
    COLUMN = 'column',
}

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabClick: (value: string) => void;
    direction?: TabsDirection;
    panel?: boolean;
}

export const Tabs = memo((props: TabsProps) => {
    const {
        className,
        tabs,
        onTabClick,
        value,
        direction = TabsDirection.ROW,
        panel = false,
    } = props;
    const { t } = useTranslation();

    const clickHandle = useCallback((value: string) => () => {
        onTabClick(value);
    }, [onTabClick]);

    return (
        <div className={classNames(cls.Tabs, {}, [className, cls[direction]])}>
            {tabs.map((tab) => (
                <Card
                    theme={panel
                        ? tab.value === value ? CardTheme.PANEL_TAB_SELECTED : CardTheme.PANEL_TAB
                        : tab.value === value ? CardTheme.BLUE : CardTheme.NORMAL}
                    className={cls.tab}
                    key={tab.value}
                    onClick={clickHandle(tab.value)}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    );
});
