export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore();
    if (!userStore.isLoggedIn && to.path != '/') {
        return navigateTo('/');
    }
})