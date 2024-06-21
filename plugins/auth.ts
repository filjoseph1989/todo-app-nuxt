import { defineNuxtPlugin } from "#app";
import { useCookie } from 'nuxt/app';

export default defineNuxtPlugin((nuxtApp) => {
    type SetAuthToken = (token: string) => void;

    const setAuthToken: SetAuthToken = (token: string) => {
        const authToken = useCookie('authToken', {
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            sameSite: true,
            maxAge: 3600,
            httpOnly: true,
        })
        authToken.value = token;

        const authState = useState('authToken', () => token);
        authState.value = token;

        nuxtApp.$graphql.default.setHeader('Authorization', `Bearer ${authToken.value}`);
    };

    nuxtApp.provide('setAuthToken', setAuthToken);
});