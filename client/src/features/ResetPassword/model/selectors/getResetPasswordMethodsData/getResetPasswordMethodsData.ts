import { createSelector } from '@reduxjs/toolkit';
import { getResetPasswordMethods } from '../getResetPassword/getResetPassword';

export const getResetPasswordMethodsData = createSelector(
    getResetPasswordMethods,
    (methods) => (methods.length ? methods : null),
);
// @ts-ignore
