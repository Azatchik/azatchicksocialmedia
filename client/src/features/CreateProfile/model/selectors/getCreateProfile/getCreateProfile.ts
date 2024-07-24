import { StateSchema } from 'app/providers/StoreProvider';

export const getCreateProfileFirstName = (state: StateSchema) => state.createProfile?.firstName ?? '';
export const getCreateProfileSecondName = (state: StateSchema) => state.createProfile?.secondName ?? '';
export const getCreateProfileBirthDay = (state: StateSchema) => state.createProfile?.birthDay ?? '';
export const getCreateProfileBirthMonth = (state: StateSchema) => state.createProfile?.birthMonth ?? '';
export const getCreateProfileBirthYear = (state: StateSchema) => state.createProfile?.birthYear ?? '';
export const getCreateProfileIsLoading = (state: StateSchema) => state.createProfile?.isLoading ?? '';
export const getCreateProfileServerError = (state: StateSchema) => state.createProfile?.serverError ?? '';
export const getCreateProfileValidationErrors = (state: StateSchema) => state.createProfile?.validationErrors ?? [];
