import { useUserStore } from "~/stores/user";
import { DELETE_TASK } from '~/graphql/queries'

export const useDeleteTask = () => {
    const store = useUserStore();
    const { $graphql } = useNuxtApp();

    const deleteTask = async (taskId) => {
        const response = await $graphql.default.request(DELETE_TASK, {
            id: taskId,
            user_id: store.getUserId
        })
        return response;
    }

    return { deleteTask }
}