import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { Card, CardTheme } from 'shared/ui/Card/Card';
import { VStack } from 'shared/ui/Stack';
import { useSelector } from 'react-redux';
import { getProfileData } from 'entities/Profile';
import { ProfileMediaMusic } from '../ProfileMediaMusic/ProfileMediaMusic';
import cls from './ProfileMedia.module.scss';
import { ProfileMediaToggle } from '../ProfileMediaToggle/ProfileMediaToggle';
import { ProfileMediaImages } from '../ProfileMediaImages/ProfileMediaImages';

interface ProfileMediaProps {
    className?: string;
}

export const ProfileMedia = memo((props: ProfileMediaProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const [tabValue, setTabBooleanValue] = useState<string>('photo');
    const profileData = useSelector(getProfileData);

    const onTabClick = useCallback((value: string) => {
        setTabBooleanValue(value);
    }, []);

    return (
        <Card
            className={classNames(cls.ProfileMedia, {}, [className])}
            theme={CardTheme.PANEL}
        >
            <VStack
                gap="16"
            >
                <ProfileMediaToggle onTabClick={onTabClick} tabValue={tabValue} />
                {tabValue === 'photo'
                    ? <ProfileMediaImages />
                    : !!profileData.music.length && <ProfileMediaMusic />}
            </VStack>
        </Card>
    );
});
