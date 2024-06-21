import { defineNuxtPlugin } from "#app";
import { useCookie } from 'nuxt/app';

export default defineNuxtPlugin((nuxtApp) => {
    type SetAuthToken = (token: string) => void;

    const setAuthToken: SetAuthToken = (token: string) => {
        const authToken = useCookie('authToken', {
            path: '/',
            secure: true,
            sameSite: true,
            maxAge: 3600,
            httpOnly: true,
        })
        authToken.value = token;
        nuxtApp.$graphql.default.setHeader('Authorization', `Bearer ${authToken.value}`);
        console.log(authToken.value)
    };

    nuxtApp.provide('setAuthToken', setAuthToken);

    type ClearAuthToken = () => void;

    const clearAuthToken: ClearAuthToken = () => {
        const authToken = useCookie('authToken', {
            path: '/',
            secure: true,
            sameSite: true,
            maxAge: 3600,
            httpOnly: true,
        })
        authToken.value = null;
    };

    nuxtApp.provide('clearAuthToken', (token: string) => clearAuthToken);

    type SetAuthorizationHeader = () => void;

    const setAuthorizationHeader: SetAuthorizationHeader = () => {
        const authToken = useCookie('authToken');
        console.log("setting a header", authToken, authToken.value);
        if (authToken.value) {
            nuxtApp.$graphql.default.setHeader('Authorization', `Bearer ${authToken.value}`);
        }
    };

    nuxtApp.hook('app:mounted', setAuthorizationHeader);
    nuxtApp.provide('setAuthorizationHeader', setAuthorizationHeader);
});