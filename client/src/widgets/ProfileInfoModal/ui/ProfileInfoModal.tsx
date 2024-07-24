import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Modal, ModalSizes } from 'shared/ui/Modal/Modal';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { useSelector } from 'react-redux';
import { getProfileData } from 'entities/Profile';
import birthDateIcon from 'shared/assets/icons/birth-date.svg';
import cityIcon from 'shared/assets/icons/city.svg';
import educationIcon from 'shared/assets/icons/education.svg';
import familyStatusIcon from 'shared/assets/icons/family-status.svg';
import statusIcon from 'shared/assets/icons/status.svg';
import languagesIcon from 'shared/assets/icons/languages.svg';
import bioIcon from 'shared/assets/icons/biography.svg';
import { Icon, IconSizes, IconTheme } from 'shared/ui/Icon/Icon';
import cls from './ProfileInfoModal.module.scss';

interface ProfileInfoModalProps {
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
}

export const ProfileInfoModal = memo((props: ProfileInfoModalProps) => {
    const { className, isOpen, onClose } = props;
    const { t } = useTranslation();
    const profileData = useSelector(getProfileData);

    const getInfo = useCallback((text, data, svg) => {
        if (data) {
            return (
                <HStack
                    maxW
                    className={cls.infoRow}
                    align="start"
                >
                    <HStack
                        gap="8"
                        align="center"
                    >
                        <Icon
                            Svg={svg}
                            size={IconSizes.SMALL}
                            theme={IconTheme.BLUE}
                        />
                        <Text
                            size={TextSize.SSM}
                            theme={TextTheme.GREY}
                            className={cls.parameterInfo}
                        >
                            {`${t(text)}: `}
                        </Text>
                    </HStack>
                    <Text
                        size={TextSize.SSM}
                        theme={TextTheme.PRIMARY}
                        className={cls.dataInfo}
                    >
                        {data}
                    </Text>
                </HStack>
            );
        }
        return null;
    }, [t]);

    return (
        <Modal
            className={classNames(cls.ProfileInfoModal, {}, [className])}
            size={ModalSizes.PROFILE}
            lazy
            isOpen={isOpen}
            onClose={onClose}
            isPanel
        >
            <HStack
                justify="center"
                maxW
                className={cls.modalHeader}
            >
                <Text
                    theme={TextTheme.PRIMARY}
                    size={TextSize.SM}
                >
                    {t('Подробная информация')}
                </Text>
            </HStack>
            <VStack
                gap="16"
                className={cls.profileInfoWrapper}
            >
                {getInfo('Cтатус', profileData.lifeStatus, statusIcon)}
                {getInfo('Город', profileData.city, cityIcon)}
                {getInfo('Дата рождения', `${profileData.birthDay}.${profileData.birthMonth}.${profileData.birthYear}`, birthDateIcon)}
                {getInfo('Образование', profileData.education, educationIcon)}
                {getInfo('Семейное положение', profileData.familyStatus, familyStatusIcon)}
                {getInfo('Языки', profileData.languages, languagesIcon)}
                {getInfo('О себе', profileData.bio, bioIcon)}
            </VStack>
        </Modal>
    );
});
