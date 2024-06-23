<template>
    <v-app-bar app dense>
      <v-container class="d-flex justify-end">
        <v-btn @click="logout" color="primary" dark>Logout</v-btn>
      </v-container>
    </v-app-bar>

    <v-container class="d-flex align-center justify-center" style="min-height: 95vh">
      <v-card class="pa-4" max-width="500" width="500">
        <v-card-title class="headline d-flex justify-space-between">
            Todos
            <div>
                <v-chip class="mr-1" color="primary" text-color="white">{{ totalTask }} All</v-chip>
                <v-chip class="mr-1" color="red" text-color="white">{{ todoTask }} Todos</v-chip>
                <v-chip color="green" text-color="white">{{ doneTask }} Done</v-chip>
            </div>
        </v-card-title>
        <v-card-text>
          <v-list lines="one">
            <v-list-item value="widgets" v-for="task in tasks">
                <template v-slot:prepend="{ isActive }">
                    <v-list-item-action start>
                        <v-checkbox-btn
                            v-model="task.status"
                            :value="'done'"
                            :false-value="'todo'">
                        </v-checkbox-btn>
                    </v-list-item-action>
                </template>
                <v-list-item-title>{{ task.task }}</v-list-item-title>
                <template v-slot:append>
                    <v-icon @click="removeTask(task.id)">mdi-close</v-icon>
                </template>
            </v-list-item>

            <v-list-item v-if="newTodoVisible">
                <template v-slot:prepend>
                    <v-list-item-action start>
                        <v-checkbox-btn
                            v-model="newTodoStatus"
                            :value="'done'"
                            :false-value="'todo'">
                        </v-checkbox-btn>
                    </v-list-item-action>
                </template>
                <v-text-field
                    v-model="newTodoText"
                    label="New Todo"
                    @keyup.enter="addNewTask">
                </v-text-field>
                <template v-slot:append>
                    <v-icon @click="toggleNewTodo" color="red">mdi-close</v-icon>
                </template>
            </v-list-item>

            <v-list-item v-else @click="toggleNewTodo">
                <template v-slot:prepend>
                    <v-list-item-action start>
                        <v-icon color="primary">mdi-plus</v-icon>
                    </v-list-item-action>
                </template>
                <v-list-item-title>New Todo</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-container>
</template>

<script setup>
import { useLogout } from '~/composables/useLogout';
import { useFetchTask } from '~/composables/useFetchTask';
import { useDeleteTask } from '~/composables/useDeleteTask';

const { logout } = useLogout();
const { getTasks, tasks } = useFetchTask();
const { deleteTask } = useDeleteTask();

const fetchTask = () => {
    getTasks();
}

onMounted(() => {
    fetchTask();
})

// Redirect user back to `/` to login
definePageMeta({
    middleware: 'auth'
});

const totalTask = computed(() => tasks.value.length );
const todoTask = computed(() => tasks.value.filter(task => task.status === 'todo').length );
const doneTask = computed(() => tasks.value.filter(task => task.status === 'done').length );

const removeTask = (taskId) => {
    if (deleteTask(taskId)) {
        tasks.value = tasks.value.filter(task => task.id !== taskId)
    }
}

const newTodoVisible = ref(false)
const newTodoText = ref('')
const newTodoStatus = ref('todo')

const toggleNewTodo = () => {
    newTodoVisible.value = !newTodoVisible.value;
    if (!newTodoVisible.value) {
        newTodoText.value = '';
        newTodoStatus.value = 'todo';
    }
}

import { CREATE_TASK } from "~/graphql/queries";
import { useUserStore } from '~/stores/user';

const { $graphql } = useNuxtApp();
const store = useUserStore()

const addNewTask = async () => {
    if (newTodoText.value.trim() !== '') {
        const newTask = {
            task: newTodoText.value,
            user_id: store.getUserId
        }
        const response = await $graphql.default.request(CREATE_TASK, newTask)

        if (response) {
            tasks.value.push(response.createTask);
            newTodoText.value = '';
            toggleNewTodo();
        }
    }
}
</script>