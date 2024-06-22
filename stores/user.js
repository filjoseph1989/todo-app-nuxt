import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        userId: null,
        authToken: null
    }),
    getters: {
        isLoggedIn: (state) => !!state.user,
        getUserId: (state) => state.userId,
        getAuthToken: (state) => state.authToken
    },
    actions: {
        setUser(user) {
            this.user = user;
        },
        clearUser() {
            this.user = null;
            this.authToken = null;
            this.userId = null;
        },
        setUserId(id) {
            this.userId = id;
        },
        setToken(token) {
            this.authToken = token;
        }
    },
    persist: {
        storage: persistedState.cookiesWithOptions({
            sameSite: 'strict',
        }),
    },
});