import { createSelector } from '@reduxjs/toolkit';
import {
    getAuthorizationByPhoneServerError,
} from '../getAuthorizationByPhone/getAuthorizationByPhone';
import {
    AuthorizationByPhoneServerErrorTypes,
} from '../../types/AuthorizationByPhoneServerErrorTypes';

export const getAuthorizationByPhoneServerErrors = createSelector(
    getAuthorizationByPhoneServerError,
    (authorizationByPhoneServerError) => {
        if (!authorizationByPhoneServerError) {
            return undefined;
        }
        const typeError = authorizationByPhoneServerError.split(':')[0];
        let errorText;

        switch (typeError) {
        case AuthorizationByPhoneServerErrorTypes.NOT_FOUND_USER_ERROR:
            errorText = 'Неверный номер телефона или пароль';
            break;
        case AuthorizationByPhoneServerErrorTypes.INVALID_PASSWORD_ERROR:
            errorText = 'Неверный номер телефона или пароль';
            break;
        default:
            if (typeError && !errorText) {
                errorText = 'Хм, что-то пошло не так';
            }
        }

        return errorText;
    },
);
