import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Card, CardTheme } from 'shared/ui/Card/Card';
import { Textarea } from 'shared/ui/Textarea/Textarea';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    EditProfilePageActions,
    getEditProfileForm,
    getEditProfileIsChanged,
    getEditProfileIsLoading,
} from 'pages/EditProfilePage';
import { useSelector } from 'react-redux';
import { PanelInput } from 'shared/ui/PanelInput/PanelInput';
import { HStack, VStack } from 'shared/ui/Stack';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Loader } from 'shared/ui/Loader/Loader';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { fetchSaveChanges } from '../model/services/fetchSaveChanges/fetchSaveChanges';
import cls from './EditProfilePageMain.module.scss';

interface EditProfilePageMainProps {
    className?: string;
}

export const EditProfilePageMain = memo((props: EditProfilePageMainProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const editableProfileData = useSelector(getEditProfileForm);
    const isChanged = useSelector(getEditProfileIsChanged);
    const isLoading = useSelector(getEditProfileIsLoading);

    const onChangeBio = useCallback((value: string) => {
        dispatch(EditProfilePageActions.setBio(value));
    }, [dispatch]);

    const onChangeCity = useCallback((value: string) => {
        dispatch(EditProfilePageActions.setCity(value));
    }, [dispatch]);

    const onChangeLifeStatus = useCallback((value: string) => {
        dispatch(EditProfilePageActions.setLifeStatus(value));
    }, [dispatch]);

    const onChangeLanguages = useCallback((value: string) => {
        dispatch(EditProfilePageActions.setLanguages(value));
    }, [dispatch]);

    const onChangeFamilyStatus = useCallback((value: string) => {
        dispatch(EditProfilePageActions.setFamilyStatus(value));
    }, [dispatch]);

    const onChangeEducation = useCallback((value: string) => {
        dispatch(EditProfilePageActions.setEducation(value));
    }, [dispatch]);

    const onClearChangesClick = useCallback(() => {
        dispatch(EditProfilePageActions.clearChanges());
    }, [dispatch]);

    const onSaveChangesClick = useCallback(() => {
        dispatch(fetchSaveChanges());
    }, [dispatch]);

    const debouncedOnSaveChangesClick = useDebounce(onSaveChangesClick, 200);

    if (isLoading || !editableProfileData.id) {
        return <Loader />;
    }

    return (
        <Card
            className={classNames(cls.EditProfilePageMain, {}, [className])}
            theme={CardTheme.PANEL}
        >
            <VStack
                maxW
                gap="16"
            >
                <PanelInput
                    placeholder={t('Статус')}
                    justify="between"
                    value={editableProfileData.lifeStatus || ''}
                    onChange={onChangeLifeStatus}
                    maxW
                />
                <PanelInput
                    placeholder={t('Город')}
                    justify="between"
                    value={editableProfileData.city || ''}
                    onChange={onChangeCity}
                    maxW
                />
                <PanelInput
                    placeholder={t('Образование')}
                    justify="between"
                    value={editableProfileData.education || ''}
                    onChange={onChangeEducation}
                    maxW
                />
                <PanelInput
                    placeholder={t('Семейное положение')}
                    justify="between"
                    value={editableProfileData.familyStatus || ''}
                    onChange={onChangeFamilyStatus}
                    maxW
                />
                <PanelInput
                    placeholder={t('Языки')}
                    justify="between"
                    value={editableProfileData.languages || ''}
                    onChange={onChangeLanguages}
                    maxW
                />
                <Textarea
                    onChange={onChangeBio}
                    value={editableProfileData.bio || ''}
                    placeholder={t('О себе')}
                    justify="between"
                    maxW
                />
                <HStack
                    maxW
                    justify="center"
                    gap="8"
                    className={cls.editBtns}
                >
                    {isChanged && (
                        <Button
                            theme={ButtonTheme.SECONDARY}
                            isSmall
                            onClick={onClearChangesClick}
                        >
                            {t('Отменить')}
                        </Button>
                    )}
                    <Button
                        theme={ButtonTheme.PRIMARY}
                        isSmall
                        onClick={debouncedOnSaveChangesClick}
                    >
                        {t('Сохранить')}
                    </Button>
                </HStack>
            </VStack>
        </Card>
    );
});
