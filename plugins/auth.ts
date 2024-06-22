import { defineNuxtPlugin } from "#app";
import { useCookie } from 'nuxt/app';

export default defineNuxtPlugin((nuxtApp) => {
    type SetAuthToken = (token: string) => void;

    const setAuthToken: SetAuthToken = (token: string) => {
        nuxtApp.$graphql.default.setHeader('Authorization', `Bearer ${token}`);
    };

    nuxtApp.provide('setAuthToken', setAuthToken);
});