import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useEffect } from 'react';
import { Page } from 'widgets/Page/Page';
import { EditProfileHeader } from 'widgets/EditProfileHeader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { fetchProfileById, getProfileData, ProfileReducer } from 'entities/Profile';
import { useSelector } from 'react-redux';
import { EditProfilePageMain } from 'widgets/EditProfilePageMain';
import { VStack } from 'shared/ui/Stack';
import cls from './EditProfilePage.module.scss';
import { fetchProfileData } from '../model/services/fetchProfileData/fetchProfileData';
import { EditProfilePageReducer } from '../model/slices/EditProfilePageSlice';

interface EditProfilePageProps {
    className?: string;
}

const reducers: ReducersList = {
    editProfile: EditProfilePageReducer,
    profile: ProfileReducer,
};

const EditProfilePage = memo((props: EditProfilePageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const profileData = useSelector(getProfileData);

    useEffect(() => {
        if (!profileData.id) {
            dispatch(fetchProfileById());
        }
        if (profileData.id) {
            dispatch(fetchProfileData());
        }
    }, [dispatch, profileData.id]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames(cls.EditProfilePage, {}, [className])}>
                <VStack
                    gap="20"
                >
                    {!!profileData.id && <EditProfileHeader />}
                    <EditProfilePageMain />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default EditProfilePage;
