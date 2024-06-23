<template>
    <button @click="goToLogin">Go back to login</button>
    <button @click="getTasks">Get Task</button>
    <button @click="logout">Logout</button>
</template>

<script setup>
import { useLogout } from '~/composables/useLogout';
const { logout } = useLogout();

// Redirect user back to `/` to login
definePageMeta({
    middleware: 'auth'
});

const goToLogin = () => {
    navigateTo('/');
}
</script>