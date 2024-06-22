import { ref } from 'vue'
import { useUserStore } from '~/stores/user';
import { LOGIN_MUTATION } from '~/graphql/queries';

export const useLogin = () => {
    const { $graphql, $setAuthToken } = useNuxtApp();
    const store = useUserStore();

    const email = ref('test@example.com');
    const password = ref('password');

    const login = async () => {
        try {
            const data = await $graphql.auth.request(LOGIN_MUTATION, {
                email: email.value,
                password: password.value
            });

            if (data?.login?.token) {
                store.setUser(true);
                store.setUserId(data.login.id);
                store.setToken(data.login.token);

                // Redirect to page /todos
                navigateTo('/todos');
            } else {
                console.log('Invalid email or password');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return {
        email,
        password,
        login,
    };
}