import {
    RegistrationByPhoneValidateErrorTypes,
} from '../../types/RegistrationByPhoneValidateErrorTypes';

export const validateCode = (code: string) => {
    if (!code) {
        return [RegistrationByPhoneValidateErrorTypes.EMPTY_CODE_ERROR];
    }

    const errors: RegistrationByPhoneValidateErrorTypes[] = [];

    const isValidCode = /^\d+$/.test(code);
    const isCurrentCodeLength = code.length;
    if (!isValidCode || isCurrentCodeLength !== 6) {
        errors.push(RegistrationByPhoneValidateErrorTypes.FORMAT_CODE_ERROR);
    }

    return errors;
};
