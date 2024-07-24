import {
    RegistrationByPhoneValidateErrorTypes,
} from './RegistrationByPhoneValidateErrorTypes';

export interface RegistrationByPhoneSchema {
    phone?: string;
    code?: string;
    password?: string;
    passwordConfirm?: string;
    email?: string;
    isLoading?: boolean;
    serverError?: string;
    validationErrors?: RegistrationByPhoneValidateErrorTypes[];

    _token?: string;
    _currentCode?: string;
}
