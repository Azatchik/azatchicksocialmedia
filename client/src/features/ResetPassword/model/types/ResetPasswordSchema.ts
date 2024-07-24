import { ResetPasswordValidateErrorTypes } from './ResetPasswordValidateErrorTypes';

export interface ResetPasswordSchema {
    phone?: string;
    code?: string;
    password?: string;
    passwordConfirm?: string;
    isLoading?: boolean;
    serverError?: string;
    validationErrors?: ResetPasswordValidateErrorTypes[];
    method?: string;

    _token?: string;
    _currentCode?: string;
    _methods?: string[];
}
