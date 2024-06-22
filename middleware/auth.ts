export default defineNuxtRouteMiddleware((to, from) => {
    const { $setAuthToken } = useNuxtApp();
    const userStore = useUserStore();

    $setAuthToken();
    
    if (!userStore.isLoggedIn && to.path != '/') {
        return navigateTo('/');
    }
})