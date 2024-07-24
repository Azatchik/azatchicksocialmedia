export enum CatalogTypes {
    PROFILES = 'profiles',
    POSTS = 'posts',
}

export interface MediaSchema {
    catalog?: CatalogTypes;
    arrayMedia: string[];
    indexMedia: number;
    selectedMedia: string;
    isOpen: boolean;
    arrayDeletedMedia: string[];
}
