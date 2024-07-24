import { StateSchema } from 'app/providers/StoreProvider';

export const getMediaSelectedMedia = (state: StateSchema) => state.media?.selectedMedia ?? '';
export const getMediaIsOpen = (state: StateSchema) => state.media?.isOpen ?? false;
export const getMediaCatalog = (state: StateSchema) => state.media?.catalog ?? '';
export const getMediaIndex = (state: StateSchema) => state.media?.indexMedia ?? 0;
export const getMediaArray = (state: StateSchema) => state.media?.arrayMedia ?? [];
export const getMediaDeletedArray = (state: StateSchema) => state.media?.arrayDeletedMedia ?? [];
