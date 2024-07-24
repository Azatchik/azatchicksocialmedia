import { CreateProfileValidateErrorTypes } from './CreateProfileValidateErrorTypes';

export interface CreateProfileSchema {
    firstName?: string;
    secondName?: string;
    birthDay: string;
    birthMonth: string;
    birthYear: string;
    isLoading?: boolean;
    validationErrors?: CreateProfileValidateErrorTypes[];
    serverError?: string;
}
