import { RegistrationByPhoneValidateErrorTypes } from '../../types/RegistrationByPhoneValidateErrorTypes';

export const validatePasswordConfirm = (passwordConfirm: string, password: string) => {
    if (!passwordConfirm) {
        return [RegistrationByPhoneValidateErrorTypes.EMPTY_PASSWORD_CONFIRM_ERROR];
    }

    const errors: RegistrationByPhoneValidateErrorTypes[] = [];

    const isValidPasswordConfirm = passwordConfirm === password;
    if (!isValidPasswordConfirm) {
        errors.push(RegistrationByPhoneValidateErrorTypes.INVALID_PASSWORD_CONFIRM_ERROR);
    }

    return errors;
};
