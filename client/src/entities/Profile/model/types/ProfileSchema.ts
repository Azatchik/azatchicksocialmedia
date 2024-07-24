export interface Profile {
    id?: string;
    firstName?: string;
    secondName?: string;
    birthDay?: string;
    birthMonth?: string;
    birthYear?: string;
    city?: string;
    languages?: string;
    bio?: string;
    education?: string;
    familyStatus?: string;
    bookmarks: string[];
    lifeStatus?: string;
    avatar?: string;
    music: string[];
    images: string[];
    headerImg?: string;
    subscriptions: string[];
    followers: string[];
}

export interface ProfileSchema {
    data: Profile;
    isLoading: boolean;
    error?: string;
}
