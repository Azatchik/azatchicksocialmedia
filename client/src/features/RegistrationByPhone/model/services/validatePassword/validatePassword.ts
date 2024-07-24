import { RegistrationByPhoneValidateErrorTypes } from '../../types/RegistrationByPhoneValidateErrorTypes';

export const validatePassword = (password: string) => {
    if (!password) {
        return [RegistrationByPhoneValidateErrorTypes.EMPTY_PASSWORD_ERROR];
    }

    const errors: RegistrationByPhoneValidateErrorTypes[] = [];

    const regex = /^(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
    const isValidPassword = regex.test(password);
    if (!isValidPassword) {
        errors.push(RegistrationByPhoneValidateErrorTypes.SYMBOLS_PASSWORD_ERROR);
    }

    const isValidPasswordLength = password.length > 6 && password.length < 40;
    if (!isValidPasswordLength) {
        errors.push(RegistrationByPhoneValidateErrorTypes.LENGTH_PASSWORD_ERROR);
    }

    return errors;
};
