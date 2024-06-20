<template>
  <div>
    <form @submit.prevent="login">
      <label>
        Username:
        <input v-model="email" type="text" name="email" required autocomplete="email" />
      </label>
      <br />
      <label>
        Password:
        <input v-model="password" type="password" name="password" required autocomplete="current-password" />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { gql } from 'nuxt-graphql-request/utils';
import { ref } from 'vue'

const { $graphql } = useNuxtApp();
const email = ref('')
const password = ref('')

const query = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
    }
  }`;

const login = async () => {
  try {
    const data = await $graphql.auth.request(query, { email: email.value, password: password.value });
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    process.exit(1);
  }
}
</script>