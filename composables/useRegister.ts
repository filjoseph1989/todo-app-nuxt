import { REGISTER } from '~/graphql/queries';

export const useRegister = () => {
    const { $graphql } = useNuxtApp();
    const errorMessage = ref('');
    const registerError = ref(false);

    const register = async (first_name: string, last_name: string, email: string, password: string) => {
        try {
            const response = await $graphql.auth.request(REGISTER, {
                email,
                password,
                first_name,
                last_name
            });
            if (response?.register?.message) {
                // Todo: Dapat mo login sya diritso
                navigateTo('/')
            } else {
                errorMessage.value = "An error occurred while registering";
                registerError.value = true;
            }
        } catch (error) {
            errorMessage.value = "An error occurred while registering";
            registerError.value = true;
            console.log(error)
        }
    }

    return { register, errorMessage, registerError }
}