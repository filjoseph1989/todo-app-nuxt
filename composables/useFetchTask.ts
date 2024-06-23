import { FETCH_TASKS } from '~/graphql/queries';
import { ref } from 'vue';


export const useFetchTask = () => {
    const { $graphql } = useNuxtApp();
    const tasks = ref([]);

    const getTasks = async () => {
        try {
            const response = await $graphql.default.request(FETCH_TASKS)
            tasks.value = response.task;
        } catch (error) {
            console.log(error);
        }
    }

    return { tasks, getTasks }
}