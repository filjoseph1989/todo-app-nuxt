import { useUserStore } from '~/stores/user';
import { LOGOUT } from '~/graphql/queries';

export const useLogout = () => {
    const store = useUserStore();
    const { $graphql } = useNuxtApp();

    const logout = async () => {
        try {
            const response = await $graphql.default.request(LOGOUT, {
                user_id: store.getUserId
            });

            if (response?.logout?.message) {
                store.clearUser();
                navigateTo('/');
            }
        } catch (error) {
            console.log(error)
        }
    }

    return { logout };
}