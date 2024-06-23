import { FETCH_TASKS } from '~/graphql/queries';

const { $graphql } = useNuxtApp();

export const useFetchTask = () => {
    const getTasks = async () => {
        try {
            const tasks = await $graphql.default.request(FETCH_TASKS)
            console.log(tasks);
        } catch (error) {
            console.log(error);
        }
    }

    return { getTasks }
}