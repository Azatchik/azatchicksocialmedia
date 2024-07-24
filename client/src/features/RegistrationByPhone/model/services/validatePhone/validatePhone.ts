import { RegistrationByPhoneValidateErrorTypes } from '../../types/RegistrationByPhoneValidateErrorTypes';

export const validatePhone = (phone: string) => {
    if (!phone) {
        return [RegistrationByPhoneValidateErrorTypes.EMPTY_PHONE_ERROR];
    }

    const errors: RegistrationByPhoneValidateErrorTypes[] = [];

    const isValidPhone = /^\d+$/.test(phone);
    const isCurrentPhoneLength = phone.length > 10 && phone.length < 15;
    if (!isValidPhone || !isCurrentPhoneLength) {
        errors.push(RegistrationByPhoneValidateErrorTypes.FORMAT_PHONE_ERROR);
    }

    return errors;
};
