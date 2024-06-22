import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        userId: null
    }),
    getters: {
        isLoggedIn: (state) => !!state.user,
        getUserId: (state) => state.userId
    },
    actions: {
        setUser(user) {
            this.user = user;
        },
        clearUser() {
            this.user = null;
        },
        setUserId(id) {
            this.userId = id;
        }
    },
    persist: {
        storage: persistedState.cookiesWithOptions({
            sameSite: 'strict',
        }),
    },
});