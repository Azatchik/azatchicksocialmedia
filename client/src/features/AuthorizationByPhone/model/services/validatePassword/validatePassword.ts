import {
    AuthorizationByPhoneValidateErrorTypes,
} from '../../types/AuthorizationByPhoneValidateErrorTypes';

export const validatePassword = (password: string) => {
    if (!password) {
        return [AuthorizationByPhoneValidateErrorTypes.EMPTY_PASSWORD_ERROR];
    }

    return [];
};
