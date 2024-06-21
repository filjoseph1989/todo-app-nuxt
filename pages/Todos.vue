<template>
    <button @click="goToLogin">Go back to login</button>
    <button @click="getTasks">Get Task</button>
    <button @click="logout">Logout</button>
</template>

<script setup>
import { gql } from 'nuxt-graphql-request/utils';

const { $graphql, $setAuthToken } = useNuxtApp();

const fetchTasks = gql`
    query FetchTask {
        task {
            id
            task
            status
        }
    }`

const getTasks = async () => {
    const tasks = await $graphql.default.request(fetchTasks)
    console.log(tasks);
}

const router = useRouter();

const goToLogin = () => {
    router.push('/');
}

const logout = async () => {
    const userId = useCookie('userId');

    const query = gql`
        mutation Logout ($user_id: ID!) {
            logout (user_id: $user_id) {
                message
            }
        }`;

    try {
        const response = await $graphql.default.request(query, {
            user_id: userId.value
        });
        if (response?.logout?.message) {
            $setAuthToken(null);
            const authTokenCookie = useCookie('authToken');
            authTokenCookie.value = null;
            router.push('/');
        }
    } catch (e) {
        console.log(e)
    }
}
</script>