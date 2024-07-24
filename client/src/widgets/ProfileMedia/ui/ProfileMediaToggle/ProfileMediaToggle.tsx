import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { Icon, IconSizes, IconTheme } from 'shared/ui/Icon/Icon';
import photoIcon from 'shared/assets/icons/gallery.svg';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import musicIcon from 'shared/assets/icons/music.svg';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import { useSelector } from 'react-redux';
import { getProfileData } from 'entities/Profile';

interface ProfileMediaToggleProps {
    className?: string;
    onTabClick: (value: string) => void;
    tabValue: string;
}

export const ProfileMediaToggle = memo((props: ProfileMediaToggleProps) => {
    const { className, onTabClick, tabValue } = props;
    const { t } = useTranslation();
    const profileData = useSelector(getProfileData);

    const onTabClickHandler = useCallback((value: string) => {
        onTabClick(value);
    }, [onTabClick]);

    const toggleTabs: TabItem[] = useMemo(() => {
        const tabs: TabItem[] = [
            {
                value: 'photo',
                content: [
                    <Icon
                        Svg={photoIcon}
                        size={IconSizes.SMALL}
                        theme={IconTheme.PANEL}
                    />,
                    <Text
                        theme={tabValue === 'photo' ? TextTheme.PRIMARY : TextTheme.GREY}
                        size={TextSize.S}
                        isBold
                    >
                        {t('Фото')}
                    </Text>,
                ],
            },
        ];
        if (profileData.music.length) {
            tabs.push({
                value: 'music',
                content: [
                    <Icon
                        Svg={musicIcon}
                        size={IconSizes.SMALL}
                        theme={IconTheme.PANEL}
                    />,
                    <Text
                        theme={tabValue === 'music' ? TextTheme.PRIMARY : TextTheme.GREY}
                        size={TextSize.S}
                        isBold
                    >
                        {t('Музыка')}
                    </Text>,
                ],
            });
        }

        return tabs;
    }, [profileData.music.length, t, tabValue]);

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
