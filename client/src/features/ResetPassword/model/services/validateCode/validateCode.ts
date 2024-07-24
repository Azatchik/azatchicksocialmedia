import {
    ResetPasswordValidateErrorTypes,
} from '../../types/ResetPasswordValidateErrorTypes';

export const validateCode = (code: string) => {
    if (!code) {
        return [ResetPasswordValidateErrorTypes.EMPTY_CODE_ERROR];
    }

    const errors: ResetPasswordValidateErrorTypes[] = [];

    const isValidCode = /^\d+$/.test(code);
    const isCurrentCodeLength = code.length;
    if (!isValidCode || isCurrentCodeLength !== 6) {
        errors.push(ResetPasswordValidateErrorTypes.FORMAT_CODE_ERROR);
    }

    return errors;
};
