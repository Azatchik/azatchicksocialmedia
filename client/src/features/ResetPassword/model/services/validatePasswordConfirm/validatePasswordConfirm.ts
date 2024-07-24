import { ResetPasswordValidateErrorTypes } from '../../types/ResetPasswordValidateErrorTypes';

export const validatePasswordConfirm = (passwordConfirm: string, password: string) => {
    if (!passwordConfirm) {
        return [ResetPasswordValidateErrorTypes.EMPTY_PASSWORD_CONFIRM_ERROR];
    }

    const errors: ResetPasswordValidateErrorTypes[] = [];

    const isValidPasswordConfirm = passwordConfirm === password;
    if (!isValidPasswordConfirm) {
        errors.push(ResetPasswordValidateErrorTypes.INVALID_PASSWORD_CONFIRM_ERROR);
    }

    return errors;
};
