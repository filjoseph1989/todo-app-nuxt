import { useUserStore } from '~/stores/user.js'

export default defineNuxtRouteMiddleware((to, from) => {
    const { $setAuthToken } = useNuxtApp();
    const userStore = useUserStore();
    const store = useUserStore();

    $setAuthToken(store.getAuthToken);

    if (!userStore.isLoggedIn && to.path != '/') {
        return navigateTo('/');
    }
    

    if (userStore.isLoggedIn && to.path == '/') {
        return navigateTo('/todos');
    }
})