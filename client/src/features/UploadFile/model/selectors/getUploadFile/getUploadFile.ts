import { StateSchema } from 'app/providers/StoreProvider';

export const getUploadFileFileName = (state: StateSchema) => state.uploadFile?.fileName ?? '';
export const getUploadFileError = (state: StateSchema) => state.uploadFile?.error ?? '';
export const getUploadFileIsLoading = (state: StateSchema) => state.uploadFile?.isLoading ?? false;
