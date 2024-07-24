import { CreateProfileValidateErrorTypes } from '../../types/CreateProfileValidateErrorTypes';

export const validateSecondName = (secondName: string) => {
    if (!secondName) {
        return [CreateProfileValidateErrorTypes.EMPTY_SECOND_NAME_ERROR];
    }

    const errors: CreateProfileValidateErrorTypes[] = [];

    const isValidSecondName = /^[A-Za-zА-Яа-яёЁ]+$/.test(secondName);
    if (!isValidSecondName) {
        errors.push(CreateProfileValidateErrorTypes.FORMAT_SECOND_NAME_ERROR);
    }

    return errors;
};
