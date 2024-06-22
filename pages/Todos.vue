<template>
    <button @click="goToLogin">Go back to login</button>
    <button @click="getTasks">Get Task</button>
    <button @click="logout">Logout</button>
</template>

<script setup>
import { gql } from 'nuxt-graphql-request/utils';

const { $graphql, $logout, $setAuthToken } = useNuxtApp();

const fetchTasks = gql`
    query FetchTask {
        task {
            id
            task
            status
        }
    }`

const getTasks = async () => {
    try {
        $setAuthToken();
        const tasks = await $graphql.default.request(fetchTasks)
        console.log(tasks);
    } catch (error) {
        console.log(error);
    }
}

const goToLogin = () => {
    navigateTo('/');
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
        $setAuthToken();
        const response = await $graphql.default.request(query, {
            user_id: userId.value
        });
        if (response?.logout?.message) {
            $logout();
            navigateTo('/');
        }
    } catch (error) {
        console.log(error)
    }
}

definePageMeta({
    middleware: 'auth'
});
</script>