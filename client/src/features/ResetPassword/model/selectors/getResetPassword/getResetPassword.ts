import { StateSchema } from 'app/providers/StoreProvider';

export const getResetPasswordPhone = (state: StateSchema) => state.resetPassword?.phone ?? '';
export const getResetPasswordCode = (state: StateSchema) => state.resetPassword?.code ?? '';
export const getResetPasswordPassword = (state: StateSchema) => state.resetPassword?.password ?? '';
export const getResetPasswordPasswordConfirm = (state: StateSchema) => state.resetPassword?.passwordConfirm ?? '';
export const getResetPasswordIsLoading = (state: StateSchema) => state.resetPassword?.isLoading ?? false;
export const getResetPasswordServerError = (state: StateSchema) => state.resetPassword?.serverError ?? '';
export const getResetPasswordValidationErrors = (state: StateSchema) => state.resetPassword?.validationErrors ?? [];
export const getResetPasswordToken = (state: StateSchema) => state.resetPassword?._token ?? '';
export const getResetPasswordCurrentCode = (state: StateSchema) => state.resetPassword?._currentCode ?? '';
export const getResetPasswordMethods = (state: StateSchema) => state.resetPassword?._methods ?? [];
export const getResetPasswordMethod = (state: StateSchema) => state.resetPassword?.method ?? '';
