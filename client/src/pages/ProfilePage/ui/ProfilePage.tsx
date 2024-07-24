import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useMemo } from 'react';
import { Page } from 'widgets/Page/Page';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ProfileHeader } from 'widgets/ProfileHeader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ProfileSubscriptions } from 'features/ProfileSubscriptions';
import { ProfileFollowers } from 'features/ProfileFollowers';
import { HStack, VStack } from 'shared/ui/Stack';
import { ProfileMedia } from 'widgets/ProfileMedia';
import {
    fetchProfileById,
    getProfileData,
    getProfileErrors, ProfileReducer,
} from 'entities/Profile';
import { Card, CardTheme } from 'shared/ui/Card/Card';
import cls from './ProfilePage.module.scss';

interface ProfilePageProps {
    className?: string;
}

const reducers: ReducersList = {
    profile: ProfileReducer,
};

const ProfilePage = (props: ProfilePageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const error = useSelector(getProfileErrors);
    const profileData = useSelector(getProfileData);

    useEffect(() => {
        dispatch(fetchProfileById(id));
    }, [dispatch, id]);

    let content;

    const getContent = () => {
        if (error) {
            content = (
                <Page className={classNames(cls.ProfilePage, {}, [className])}>
                    <ProfileHeader />
                </Page>
            );
        } else {
            content = (
                <Page className={classNames(cls.ProfilePage, {}, [className])}>
                    {profileData.id && [
                        <VStack
                            gap="20"
                        >
                            <ProfileHeader />
                            <HStack
                                maxW
                                gap="20"
                                align="start"
                            >
                                <VStack
                                    gap="20"
                                >
                                    <ProfileMedia />
                                    <Card
                                        theme={CardTheme.PANEL}
                                        style={{ padding: '20px', width: '604px', height: '350px' }}
                                    >
                                        <video controls width="100%" height="100%">
                                            <source src={`${__API__}/static/posts/vizivalovo.mp4`} type="video/mp4" />
                                        </video>
                                    </Card>
                                </VStack>
                                <VStack
                                    gap="20"
                                >
                                    <ProfileFollowers />
                                    <ProfileSubscriptions />
                                </VStack>
                            </HStack>
                        </VStack>,
                    ]}
                </Page>
            );
        }
        return content;
    };

    return (
        <DynamicModuleLoader reducers={reducers}>
            {getContent()}
        </DynamicModuleLoader>
    );
};

export default ProfilePage;
