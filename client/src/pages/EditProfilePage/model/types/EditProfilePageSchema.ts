import { Profile } from 'entities/Profile';

export type EditableProfileData = Omit<Profile,
    'images' |
    'followers' |
    'subscriptions' |
    'music' |
    'bookmarks' |
    'headerImg' |
    'avatar' |
    'firstName' |
    'secondName' |
    'birthDay' |
    'birthMonth' |
    'birthYear'
>

export interface EditProfilePageSchema {
    form: EditableProfileData;
    data: EditableProfileData;

    isLoading: boolean;
    error?: string;
    isChanged: boolean;
}
