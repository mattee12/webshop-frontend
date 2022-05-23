import { Module } from 'vuex';
import { RootState } from '@/store/index';
import User from '@/model/user/User';

const userStore:  Module<UserState, RootState> = {
    state: {
    },
    mutations: {
        login: (state: UserState, payload: User) => state.user = payload,
        logout: (state: UserState) => state.user = undefined,
    },
    getters: {
        isLoggedIn: (state: UserState) => !!state.user,
        getCart: (state: UserState) => state.user ? state.user.cart : [],
    },
}

export default userStore

export type UserState = {
    user?: User,
}