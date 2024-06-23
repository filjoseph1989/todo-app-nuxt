import { TASK_UPDATE } from '~/graphql/queries';
import { useUserStore } from '~/stores/user';

export const useUpdateTask = () => {
    const { $graphql } = useNuxtApp();
    const store = useUserStore();

    const updateTask = async (id: string, task: string, status: string) => {
        const response = await $graphql.default.request(TASK_UPDATE, {
            id: id,
            task: task,
            status: status,
            user_id: store.getUserId
        });

        return response;
    }

    return { updateTask };
}