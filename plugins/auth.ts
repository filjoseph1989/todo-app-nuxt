import { defineNuxtPlugin } from "#app";
import { useCookie } from 'nuxt/app';

export default defineNuxtPlugin((nuxtApp) => {
    type SetAuthToken = (token: string) => void;
    type SetUserId = (id: string) => void;
    type GetToken = () => string;

    const cookieOptions = {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: true,
        maxAge: 3600,
        httpOnly: true
    };

    const setAuthToken: SetAuthToken = (token: string) => {
        if (getToken()) {
            nuxtApp.$graphql.default.setHeader('Authorization', `Bearer ${getToken()}`);
            return;
        }

        const authToken = useCookie('authToken', cookieOptions)
        authToken.value = token;

        nuxtApp.$graphql.default.setHeader('Authorization', `Bearer ${authToken.value}`);
    };

    const logout: SetUserId = (id: string) => {
        const token = useCookie('authToken')
        token.value = null;
    };

    const getToken: GetToken = () => {
        return useCookie('authToken').value
    };

    nuxtApp.provide('setAuthToken', setAuthToken);
    nuxtApp.provide('logout', logout);
});