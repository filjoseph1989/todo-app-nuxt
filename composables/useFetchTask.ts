import { FETCH_TASKS } from '~/graphql/queries';
import { ref } from 'vue';
import { useUserStore } from '~/stores/user';


export const useFetchTask = () => {
    const store = useUserStore()
    const { $graphql } = useNuxtApp();
    const tasks = ref([]);

    const getTasks = async () => {
        try {
            const response = await $graphql.default.request(FETCH_TASKS, {
                user_id: store.getUserId
            })
            tasks.value = response.task;
        } catch (error) {
            console.log(error);
        }
    }

    return { tasks, getTasks }
}