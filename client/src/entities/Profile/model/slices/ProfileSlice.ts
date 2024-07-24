import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EditableProfileData } from 'pages/EditProfilePage';
import { fetchProfileById } from '../services/fetchProfileById/fetchProfileById';
import { Profile, ProfileSchema } from '../types/ProfileSchema';

const initialState: ProfileSchema = {
    isLoading: false,
    data: {
        followers: [],
        subscriptions: [],
        images: [],
        music: [],
        bookmarks: [],
    },
};

export const ProfileSlice = createSlice({
    name: 'Profile',
    initialState,
    reducers: {
        addFollower: (state, action) => {
            state.data.followers = [...state.data.followers, action.payload];
        },
        removeFollower: (state, action) => {
            const updateFollowers = state.data.followers;
            const followerIndex = updateFollowers.indexOf(action.payload);
            if (followerIndex !== -1) {
                updateFollowers.splice(followerIndex, 1);
                state.data.followers = updateFollowers;
            }
        },
        addImage: (state, action) => {
            state.data.images = [...state.data.images, action.payload];
        },
        addMusic: (state, action) => {
            state.data.music = [...state.data.music, action.payload];
        },
        clearDeletedImages: (state, action: PayloadAction<string[]>) => {
            const filteredImages = state.data.images.filter((img) => !action.payload.includes(img));
            state.data.images = filteredImages;
        },
        setAvatar: (state, action: PayloadAction<string>) => {
            state.data.avatar = action.payload;
        },
        setHeader: (state, action: PayloadAction<string>) => {
            state.data.headerImg = action.payload;
        },
        editProfileInfo: (state, action: PayloadAction<EditableProfileData>) => {
            state.data.lifeStatus = action.payload.lifeStatus;
            state.data.city = action.payload.city;
            state.data.familyStatus = action.payload.familyStatus;
            state.data.education = action.payload.education;
            state.data.languages = action.payload.languages;
            state.data.bio = action.payload.bio;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileById.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
                state.data = {
                    followers: [],
                    subscriptions: [],
                    images: [],
                    music: [],
                    bookmarks: [],
                };
            })
            .addCase(fetchProfileById.fulfilled, (state, action: PayloadAction<Profile>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchProfileById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: ProfileActions } = ProfileSlice;
export const { reducer: ProfileReducer } = ProfileSlice;
