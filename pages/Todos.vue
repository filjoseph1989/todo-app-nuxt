<template>
    <button @click="goToLogin">Go back to login</button>
    <button @click="getTasks">Get Task</button>
    <button @click="logout">Logout</button>
</template>

<script setup>
import { gql } from 'nuxt-graphql-request/utils';
import { useUserStore } from '~/stores/user';

const { $graphql, $logout } = useNuxtApp();
const store = useUserStore();

const fetchTasks = gql`
    query FetchTask {
        task {
            id
            task
            status
        }
    }`

// Redirect user back to `/` to login
definePageMeta({
    middleware: 'auth'
});

const getTasks = async () => {
    try {
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
    const query = gql`
        mutation Logout ($user_id: ID!) {
            logout (user_id: $user_id) {
                message
            }
        }`;

    try {
        const response = await $graphql.default.request(query, {
            user_id: store.getUserId
        });
        if (response?.logout?.message) {
            $logout();
            store.clearUser();
            navigateTo('/');
        }
    } catch (error) {
        console.log(error)
    }
}
</script>