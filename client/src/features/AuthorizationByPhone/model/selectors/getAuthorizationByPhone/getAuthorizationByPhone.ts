import { StateSchema } from 'app/providers/StoreProvider';

export const getAuthorizationByPhonePhone = (state: StateSchema) => state.authorizationByPhone?.phone ?? '';
export const getAuthorizationByPhonePassword = (state: StateSchema) => state.authorizationByPhone?.password ?? '';
export const getAuthorizationByPhoneIsLoading = (state: StateSchema) => state.authorizationByPhone?.isLoading ?? false;
export const getAuthorizationByPhoneServerError = (state: StateSchema) => state.authorizationByPhone?.serverError ?? '';
export const getAuthorizationByPhoneValidationErrors = (state: StateSchema) => state.authorizationByPhone?.validationErrors ?? [];
