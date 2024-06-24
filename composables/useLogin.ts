import { ref } from 'vue'
import { useUserStore } from '~/stores/user';
import { LOGIN_MUTATION } from '~/graphql/queries';

export const useLogin = () => {
    const { $graphql } = useNuxtApp();
    const store = useUserStore();

    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const loginError = ref(false);

    const login = async () => {
        try {
            loginError.value = false;
            
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
                errorMessage.value = 'Invalid email or password';
                loginError.value = true;
            }
        } catch (error) {
            errorMessage.value = 'An error occurred while logging in';
            loginError.value = true;
            console.error(error);
        }
    };

    return {
        email,
        password,
        login,
        errorMessage,
        loginError,
    };
}