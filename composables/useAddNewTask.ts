import { CREATE_TASK } from '~/graphql/queries';
import { useUserStore } from '~/stores/user';

const store = useUserStore();

export const useAddNewTask = () => {
    const addNewTask = async (task: string) => {
        if (task.trim() !== '') {
            const newTask = {
                task: task,
                user_id: store.getUserId
            }
            const response = await $graphql.default.request(CREATE_TASK, newTask)
            return response;
        }
    }

    return { addNewTask }
}