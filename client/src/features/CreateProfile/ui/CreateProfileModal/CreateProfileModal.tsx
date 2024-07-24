import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, Suspense, useMemo } from 'react';
import { Modal, ModalSizes } from 'shared/ui/Modal/Modal';
import { Loader } from 'shared/ui/Loader/Loader';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Popup, PopupTheme } from 'shared/ui/Popup/Popup';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CreateProfileValidateErrorTypes } from '../../model/types/CreateProfileValidateErrorTypes';
import {
    getCreateProfileServerError,
    getCreateProfileValidationErrors,
} from '../../model/selectors/getCreateProfile/getCreateProfile';
import { CreateProfileReducer } from '../../model/slices/CreateProfileSlice';
import cls from './CreateProfileModal.module.scss';
import { CreateProfileFormAsync } from '../CreateProfileForm/CreateProfileForm.async';

interface CreateProfileModalProps {
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
}

const reducers: ReducersList = {
    createProfile: CreateProfileReducer,
};

export const CreateProfileModal = memo((props: CreateProfileModalProps) => {
    const {
        className,
        isOpen,
        onClose,
    } = props;
    const error = useSelector(getCreateProfileServerError);
    const validationErrors = useSelector(getCreateProfileValidationErrors);
    const isError = !!error || !!validationErrors.length;
    const { t } = useTranslation();

    const createProfileForm = useMemo(() => <CreateProfileFormAsync />, []);

    const validateErrorTranslates: Record<any, string> = {
        // Создание профиля
        [CreateProfileValidateErrorTypes.EMPTY_FIRST_NAME_ERROR]: t('Введите имя'),
        [CreateProfileValidateErrorTypes.EMPTY_SECOND_NAME_ERROR]: t('Введите фамилию'),
        [CreateProfileValidateErrorTypes.FORMAT_FIRST_NAME_ERROR]: t('Имя должно состоять только из букв'),
        [CreateProfileValidateErrorTypes.FORMAT_SECOND_NAME_ERROR]: t('Фамилия должна состоять только из букв'),
    };

    return (
        <Modal
            className={classNames(cls.CreateProfileModal, {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
            lazy
            size={ModalSizes.BIG}
        >
            <DynamicModuleLoader reducers={reducers}>
                <Suspense fallback={<Loader />}>
                    {createProfileForm}
                    <Popup
                        isMessage={isError}
                        className={cls.popup}
                        theme={PopupTheme.BLUE}
                    >
                        {validationErrors.length
                            ? Object.entries(validateErrorTranslates)
                                .filter(([err, text]) => validationErrors.includes(err as CreateProfileValidateErrorTypes))
                                .map(([err, text]) => (
                                    <Text
                                        key={err}
                                        theme={TextTheme.WHITE}
                                        size={TextSize.SSM}
                                    >
                                        {text}
                                    </Text>
                                ))
                            : (
                                <Text
                                    theme={TextTheme.WHITE}
                                    size={TextSize.SSM}
                                >
                                    {error}
                                </Text>
                            )}
                    </Popup>
                </Suspense>
            </DynamicModuleLoader>
        </Modal>

    );
});
