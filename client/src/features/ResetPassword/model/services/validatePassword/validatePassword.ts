import { ResetPasswordValidateErrorTypes } from '../../types/ResetPasswordValidateErrorTypes';

export const validatePassword = (password: string) => {
    if (!password) {
        return [ResetPasswordValidateErrorTypes.EMPTY_PASSWORD_ERROR];
    }

    const errors: ResetPasswordValidateErrorTypes[] = [];

    const regex = /^(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
    const isValidPassword = regex.test(password);
    if (!isValidPassword) {
        errors.push(ResetPasswordValidateErrorTypes.SYMBOLS_PASSWORD_ERROR);
    }

    const isValidPasswordLength = password.length > 6 && password.length < 40;
    if (!isValidPasswordLength) {
        errors.push(ResetPasswordValidateErrorTypes.LENGTH_PASSWORD_ERROR);
    }

    return errors;
};
