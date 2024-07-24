import { createSelector } from '@reduxjs/toolkit';

import { ResetPasswordServerErrorTypes } from '../../types/ResetPasswordServerErrorTypes';
import {
    getResetPasswordServerError,
} from '../getResetPassword/getResetPassword';

export const getResetPasswordServerErrors = createSelector(
    getResetPasswordServerError,
    (resetPasswordServerError) => {
        if (!resetPasswordServerError) {
            return undefined;
        }
        const typeError = resetPasswordServerError.split(':')[0];
        let errorText;

        switch (typeError) {
        case ResetPasswordServerErrorTypes.NOT_FOUND_RESET_PASSWORD_USER_ERROR:
            errorText = 'Мы не нашли ваш аккаунт';
            break;
        case ResetPasswordServerErrorTypes.TOO_MANY_REQUESTS_ERROR:
            errorText = 'Слишком много попыток, попробуйте позже или выберите другой способ';
            break;
        case ResetPasswordServerErrorTypes.INVALID_CODE_ERROR:
            errorText = 'Неверный код';
            break;
        case ResetPasswordServerErrorTypes.NOT_FOUND_USER_CONFIRM_ID_ERROR:
            errorText = 'Время ожидания на смену пароля истекло';
            break;
        case ResetPasswordServerErrorTypes.NOT_FOUND_VERIFY_CODE_TOKEN_ERROR:
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
