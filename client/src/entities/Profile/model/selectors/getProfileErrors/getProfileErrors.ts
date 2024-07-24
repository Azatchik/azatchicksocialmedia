import { createSelector } from '@reduxjs/toolkit';

import { ProfileErrorTypes } from '../../types/ProfileErrorTypes';
import { getProfileError } from '../getProfile/getProfile';

export const getProfileErrors = createSelector(
    getProfileError,
    (profileError) => {
        if (!profileError) {
            return undefined;
        }
        const typeError = profileError.split(':')[0];
        let errorText;

        switch (typeError) {
        case ProfileErrorTypes.NOT_FOUND_PROFILE_ERROR:
            errorText = 'Профиль не найден';
            break;
        default:
            if (typeError && !errorText) {
                errorText = 'Хм, что-то пошло не так, попробуйте поискать что-нибудь другое';
            }
        }

        return errorText;
    },
);
