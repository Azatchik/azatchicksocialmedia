import {
    AuthorizationByPhoneValidateErrorTypes,
} from './AuthorizationByPhoneValidateErrorTypes';

export interface AuthorizationByPhoneSchema {
    phone?: string;
    password?: string;
    isLoading?: boolean;
    serverError?: string;
    validationErrors?: AuthorizationByPhoneValidateErrorTypes[];
}
