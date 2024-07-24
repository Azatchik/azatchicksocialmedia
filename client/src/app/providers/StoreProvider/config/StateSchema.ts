import {
    AnyAction, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { CombinedState } from 'redux';
import { AxiosInstance } from 'axios';
import { UISchema } from 'features/UI';
import { rtkApi } from 'shared/api/rtkApi';
import { DeviceSchema } from 'entities/Device';
import { RegistrationByPhoneSchema } from 'features/RegistrationByPhone';
import { CreateProfileSchema } from 'features/CreateProfile';
import { UserSchema } from 'entities/User';
import { ProfileSchema } from 'entities/Profile';
import { AuthorizationByPhoneSchema } from 'features/AuthorizationByPhone';
import { ResetPasswordSchema } from 'features/ResetPassword';
import { ProfileSubscriptionsSchema } from 'features/ProfileSubscriptions';
import { ProfileFollowersSchema } from 'features/ProfileFollowers';
import { MediaSchema } from 'entities/Media';
import { UploadFileSchema } from 'features/UploadFile';
import { ProfileMediaMusicSchema } from 'widgets/ProfileMedia';
import { MusicPlayerSchema } from 'widgets/MusicPlayer';
import { EditProfilePageSchema } from 'pages/EditProfilePage/model/types/EditProfilePageSchema';
import { MusicRecommendationsSchema } from 'features/MusicRecommendations';
import { MusicPageMainMyMusicSchema, MusicPageMainSearchSchema } from 'widgets/MusicPageMain';
import { SubscribeRecommendationsSchema } from 'features/SubscribeRecommendations';
import { SubscriptionsPageMainSchema } from 'widgets/SubscriptionsPageMain';
import { FollowersPageMainSchema } from 'widgets/FollowersPageMain';

export interface StateSchema {
    user: UserSchema;
    ui: UISchema;
    device: DeviceSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
    // Асинхронные редюсеры
    registrationByPhone?: RegistrationByPhoneSchema;
    createProfile?: CreateProfileSchema;
    authorizationByPhone?: AuthorizationByPhoneSchema;
    resetPassword?: ResetPasswordSchema;
    profile?: ProfileSchema;
    profileSubscriptions?: ProfileSubscriptionsSchema;
    profileFollowers?: ProfileFollowersSchema;
    profileMediaMusic?: ProfileMediaMusicSchema;
    editProfile?: EditProfilePageSchema;
    media?: MediaSchema;
    musicPlayer?: MusicPlayerSchema;
    uploadFile?: UploadFileSchema;
    musicRecommendations?: MusicRecommendationsSchema;
    musicPageMainMyMusic?: MusicPageMainMyMusicSchema;
    musicPageMainSearch?: MusicPageMainSearchSchema;
    subscribeRecommendations?: SubscribeRecommendationsSchema;
    subscriptionsPageMain?: SubscriptionsPageMainSchema;
    followersPageMain?: FollowersPageMainSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
