import { useUserStore } from '~/stores/user';
import { LOGOUT } from '~/graphql/queries';

const { $graphql } = useNuxtApp();
const store = useUserStore();

export const useLogout = () => {
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