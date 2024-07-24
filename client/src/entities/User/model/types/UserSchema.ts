export interface UserSchema {
    id?: string
    phone?: string;
    email?: string;
    profileId?: string;
    authorizedDevices?: string[];
}
