import { StateSchema } from 'app/providers/StoreProvider';
import { EditableProfileData } from '../../types/EditProfilePageSchema';

export const getEditProfileForm = (state: StateSchema) => state.editProfile?.form ?? {} as EditableProfileData;
export const getEditProfileData = (state: StateSchema) => state.editProfile?.data ?? {} as EditableProfileData;
export const getEditProfileError = (state: StateSchema) => state.editProfile?.error ?? '';
export const getEditProfileIsLoading = (state: StateSchema) => state.editProfile?.isLoading ?? false;
export const getEditProfileIsChanged = (state: StateSchema) => state.editProfile?.isChanged ?? false;
