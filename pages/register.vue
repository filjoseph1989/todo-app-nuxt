<template>
  <v-container
    class="d-flex align-center justify-center"
    style="height: 100vh;">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <template v-if="registerError">
          <div>
            <v-alert
              density="compact"
              :text="errorMessage"
              title="Error"
              type="error"
              class="mb-4"
              closable
            ></v-alert>
          </div>
        </template>
        <v-form @submit.prevent="registerUser">
          <v-text-field
            v-model="first_name"
            label="First Name"
            type="text"
            name="name"
            required
          ></v-text-field>
          <v-text-field
            v-model="last_name"
            label="First Name"
            type="text"
            name="name"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            name="email"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            name="password"
            required
          ></v-text-field>
          <v-btn type="submit" color="primary">Register</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRegister } from '~/composables/useRegister';

const { register, errorMessage, registerError } = useRegister();

const first_name = ref('');
const last_name = ref('');
const email = ref('');
const password = ref('');
const registerUser = () => {
    register(first_name.value, last_name.value, email.value, password.value);
}
</script>
