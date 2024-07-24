import { StateSchema } from 'app/providers/StoreProvider';

export const getRegistrationByPhonePhone = (state: StateSchema) => state.registrationByPhone?.phone ?? '';
export const getRegistrationByPhoneCode = (state: StateSchema) => state.registrationByPhone?.code ?? '';
export const getRegistrationByPhonePassword = (state: StateSchema) => state.registrationByPhone?.password ?? '';
export const getRegistrationByPhonePasswordConfirm = (state: StateSchema) => state.registrationByPhone?.passwordConfirm ?? '';
export const getRegistrationByPhoneEmail = (state: StateSchema) => state.registrationByPhone?.email ?? '';
export const getRegistrationByPhoneIsLoading = (state: StateSchema) => state.registrationByPhone?.isLoading ?? false;
export const getRegistrationByPhoneServerError = (state: StateSchema) => state.registrationByPhone?.serverError ?? '';
export const getRegistrationByPhoneValidationErrors = (state: StateSchema) => state.registrationByPhone?.validationErrors ?? [];
export const getRegistrationByPhoneToken = (state: StateSchema) => state.registrationByPhone?._token ?? '';
export const getRegistrationByPhoneCurrentCode = (state: StateSchema) => state.registrationByPhone?._currentCode ?? '';
