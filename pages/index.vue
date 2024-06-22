<template>
  <v-container>
    <v-form @submit.prevent="login">
      <v-text-field
        v-model="email"
        label="Email"
        type="text"
        name="email"
        required
        autocomplete="email"
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        name="password"
        required
        autocomplete="current-password"
      ></v-text-field>
      <v-btn type="submit" color="primary">Login</v-btn>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});

import { useLogin } from '~/composables/useLogin';
const { email, password, login} = useLogin();
</script>