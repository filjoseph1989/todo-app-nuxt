<template>
  <div>
    <form @submit.prevent="login" method="post">
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
import { useUserStore } from '~/stores/user';

const {
  $graphql,
  $setAuthToken,
  $setUserId
} = useNuxtApp();

const email = ref('test@example.com')
const password = ref('password')
const router = useRouter();
const store = useUserStore();

const query = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      token
    }
  }`;

const login = async () => {
  try {
    const data = await $graphql.auth.request(query, {
      email: email.value,
      password: password.value
    });

    if (data.login.token) {
      $setAuthToken(data.login.token);
      $setUserId(data.login.id);

      store.setUser(true)

      // Redirect to page /todos
      navigateTo('/todos');
    }
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    process.exit(1);
  }
}
</script>