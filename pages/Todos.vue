<template>
    <button @click="goToLogin">Go back to login</button>
    <button @click="getTasks">Get Task</button>
    <button @click="logout">Logout</button>
</template>

<script setup>
import { useLogout } from '~/composables/useLogout';

const { $graphql } = useNuxtApp();
const { logout } = useLogout();

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
</script>