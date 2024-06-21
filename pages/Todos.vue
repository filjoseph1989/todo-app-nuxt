<template>
    <button @click="goToLogin">Go back to login</button>
    <button @click="getTasks">Get Task</button>
</template>

<script setup>
import { gql } from 'nuxt-graphql-request/utils';

const { $graphql } = useNuxtApp();

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
    router.push('/login');
}

const isLogin = useCookie('isLogin');
console.log(isLogin);
</script>