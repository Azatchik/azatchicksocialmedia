import { createSelector } from '@reduxjs/toolkit';

import { RegistrationByPhoneServerErrorTypes } from '../../types/RegistrationByPhoneServerErrorTypes';
import {
    getRegistrationByPhoneServerError,
} from '../getRegistrationByPhone/getRegistrationByPhone';

export const getRegistrationByPhoneServerErrors = createSelector(
    getRegistrationByPhoneServerError,
    (registrationByPhoneServerError) => {
        if (!registrationByPhoneServerError) {
            return undefined;
        }
        const typeError = registrationByPhoneServerError.split(':')[0];
        let errorText;

        switch (typeError) {
        case RegistrationByPhoneServerErrorTypes.USER_ALREADY_EXISTS_ERROR:
            errorText = 'Этот номер телефона уже зарегистрирован';
            break;
        case RegistrationByPhoneServerErrorTypes.TOO_MANY_REQUESTS_ERROR:
            errorText = 'Слишком много попыток, попробуйте позже или смените номер телефона';
            break;
        case RegistrationByPhoneServerErrorTypes.INVALID_CODE_ERROR:
            errorText = 'Неверный код';
            break;
        case RegistrationByPhoneServerErrorTypes.NOT_FOUND_USER_CONFIRM_ID_ERROR:
            errorText = 'Время ожидания на установку пароля истекло';
            break;
        case RegistrationByPhoneServerErrorTypes.NOT_FOUND_VERIFY_CODE_TOKEN_ERROR:
            errorText = 'Время ожидания на подтверждение кода истекло';
            break;
        default:
            if (typeError && !errorText) {
                errorText = 'Хм, что-то пошло не так';
            }
        }

        return errorText;
    },
);
