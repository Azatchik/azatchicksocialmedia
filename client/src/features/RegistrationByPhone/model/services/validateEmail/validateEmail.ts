import { RegistrationByPhoneValidateErrorTypes } from '../../types/RegistrationByPhoneValidateErrorTypes';

export const validateEmail = (email: string) => {
    if (!email) {
        return [];
    }

    const errors: RegistrationByPhoneValidateErrorTypes[] = [];

    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const isValidEmail = regex.test(email);
    if (!isValidEmail) {
        errors.push(RegistrationByPhoneValidateErrorTypes.FORMAT_EMAIL_ERROR);
    }

    return errors;
};
