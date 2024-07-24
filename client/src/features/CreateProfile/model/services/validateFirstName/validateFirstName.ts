import {
    CreateProfileValidateErrorTypes,
} from '../../types/CreateProfileValidateErrorTypes';

export const validateFirstName = (firstName: string) => {
    if (!firstName) {
        return [CreateProfileValidateErrorTypes.EMPTY_FIRST_NAME_ERROR];
    }

    const errors: CreateProfileValidateErrorTypes[] = [];

    const isValidFirstName = /^[A-Za-zА-Яа-яёЁ]+$/.test(firstName);
    if (!isValidFirstName) {
        errors.push(CreateProfileValidateErrorTypes.FORMAT_FIRST_NAME_ERROR);
    }

    return errors;
};
