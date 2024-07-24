import { AuthorizationByPhoneValidateErrorTypes } from '../../types/AuthorizationByPhoneValidateErrorTypes';

export const validatePhone = (phone: string) => {
    if (!phone) {
        return [AuthorizationByPhoneValidateErrorTypes.EMPTY_PHONE_ERROR];
    }

    const errors: AuthorizationByPhoneValidateErrorTypes[] = [];

    const isValidPhone = /^\d+$/.test(phone);
    const isCurrentPhoneLength = phone.length > 10 && phone.length < 15;
    if (!isValidPhone || !isCurrentPhoneLength) {
        errors.push(AuthorizationByPhoneValidateErrorTypes.FORMAT_PHONE_ERROR);
    }

    return errors;
};
