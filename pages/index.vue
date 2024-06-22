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
import { useLogin } from '~/composables/useLogin';
const { email, password, login} = useLogin();
</script>