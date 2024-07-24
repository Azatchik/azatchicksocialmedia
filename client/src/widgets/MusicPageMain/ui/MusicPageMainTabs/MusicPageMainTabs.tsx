import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { Icon, IconSizes, IconTheme } from 'shared/ui/Icon/Icon';
import searchIcon from 'shared/assets/icons/search.svg';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import musicIcon from 'shared/assets/icons/music.svg';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';

interface MusicPageMainTabsProps {
    className?: string;
    onTabClick: (value: string) => void;
    tabValue: string;
}

export const MusicPageMainTabs = memo((props: MusicPageMainTabsProps) => {
    const { className, onTabClick, tabValue } = props;
    const { t } = useTranslation();

    const onTabClickHandler = useCallback((value: string) => {
        onTabClick(value);
    }, [onTabClick]);

    const toggleTabs: TabItem[] = useMemo(() => [
        {
            value: 'myMusic',
            content: [
                <Icon
                    Svg={musicIcon}
                    size={IconSizes.SMALL}
                    theme={IconTheme.PANEL}
                />,
                <Text
                    theme={tabValue === 'photo' ? TextTheme.PRIMARY : TextTheme.BLUE}
                    size={TextSize.S}
                    isBold
                >
                    {t('Моя музыка')}
                </Text>,
            ],
        },
        {
            value: 'search',
            content: [
                <Icon
                    Svg={searchIcon}
                    size={IconSizes.SMALL}
                    theme={IconTheme.PANEL}
                />,
                <Text
                    theme={tabValue === 'music' ? TextTheme.PRIMARY : TextTheme.BLUE}
                    size={TextSize.S}
                    isBold
                >
                    {t('Поиск')}
                </Text>,
            ],
        },
    ], [t, tabValue]);

    return (
        <Tabs
            className={className}
            tabs={toggleTabs}
            value={tabValue}
            onTabClick={onTabClickHandler}
            panel
        />
    );
});
