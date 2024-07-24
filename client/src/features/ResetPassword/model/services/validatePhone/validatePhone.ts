import { ResetPasswordValidateErrorTypes } from '../../types/ResetPasswordValidateErrorTypes';

export const validatePhone = (phone: string) => {
    if (!phone) {
        return [ResetPasswordValidateErrorTypes.EMPTY_PHONE_ERROR];
    }

    const errors: ResetPasswordValidateErrorTypes[] = [];

    const isValidPhone = /^\d+$/.test(phone);
    const isCurrentPhoneLength = phone.length > 10 && phone.length < 15;
    if (!isValidPhone || !isCurrentPhoneLength) {
        errors.push(ResetPasswordValidateErrorTypes.FORMAT_PHONE_ERROR);
    }

    return errors;
};
