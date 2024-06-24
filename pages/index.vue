<template>
  <v-container
    class="d-flex align-center justify-center"
    style="height: 100vh;">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-form @submit.prevent="login" method="post">
          <template v-if="loginError">
            <div>
              <v-alert
                v-if="loginError"
                density="compact"
                :text="errorMessage"
                title="Error"
                type="error"
                class="mb-4"
                closable
              ></v-alert>
            </div>
          </template>

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
          <v-btn type="button" color="primary" class="ml-1" @click="() => navigateTo('/register')">Register</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});

import { useLogin } from '~/composables/useLogin';
const { email, password, login, errorMessage, loginError } = useLogin();
</script>