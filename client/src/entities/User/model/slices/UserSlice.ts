import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { fetchUpdateUser } from '../services/fetchUpdateUser/fetchUpdateUser';
import { UserSchema } from '../types/UserSchema';

const initialState: UserSchema = {
};

export const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserSchema>) => {
            state.id = action.payload.id;
            state.phone = action.payload.phone;
            state.email = action.payload.email;
            state.profileId = action.payload.profileId;
            state.authorizedDevices = action.payload.authorizedDevices;
        },
        setPhone: (state, action: PayloadAction<UserSchema>) => {
            state.phone = action.payload.phone;
        },
        setProfileId: (state, action: PayloadAction<UserSchema>) => {
            state.profileId = action.payload.profileId;
        },
        setEmail: (state, action: PayloadAction<UserSchema>) => {
            state.email = action.payload.email;
        },
        setId: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
        },
        addDevice: (state, action) => {
            state.authorizedDevices = action.payload;
        },
        clearUser: (state) => {
            state.id = '';
            state.phone = '';
            state.email = '';
            state.profileId = '';
            state.authorizedDevices = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUpdateUser.rejected, (state, action) => {
                localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY);
            });
    },
});

export const { actions: UserActions } = UserSlice;
export const { reducer: UserReducer } = UserSlice;
