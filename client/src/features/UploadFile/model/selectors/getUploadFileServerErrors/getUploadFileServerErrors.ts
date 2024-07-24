import { createSelector } from '@reduxjs/toolkit';
import {
    getUploadFileError, getUploadFileFileName,
} from '../getUploadFile/getUploadFile';
import {
    UploadFileServerErrorTypes,
} from '../../types/UploadFileServerErrorTypes';

export const getUploadFileServerErrors = createSelector(
    [getUploadFileFileName, getUploadFileError],
    (fileName, uploadFileServerErrors) => {
        if (!uploadFileServerErrors) {
            return undefined;
        }

        let typeError;
        let errorText;

        if (typeof uploadFileServerErrors === 'string') {
            const error = uploadFileServerErrors.split(':')[0];
            typeError = error;
        } else {
            typeError = uploadFileServerErrors;
        }

        switch (typeError) {
        case UploadFileServerErrorTypes.INVALID_FILE_FORMAT:
            errorText = `Ваш файл ${fileName} имеет недопустимый формат`;
            break;
        default:
            if (typeError && !errorText) {
                errorText = 'Хм, что-то пошло не так';
            }
        }

        return errorText;
    },
);
