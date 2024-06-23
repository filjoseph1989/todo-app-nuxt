import { gql } from 'nuxt-graphql-request/utils';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      token
    }
  }`;

export const LOGOUT = gql`
  mutation Logout ($user_id: ID!) {
    logout (user_id: $user_id) {
      message
    }
  }`;

export const FETCH_TASKS = gql`
  query FetchTask ($user_id: ID!) {
    task (user_id: $user_id) {
      id
      task
      status
    }
  }`;

export const DELETE_TASK = gql`
  mutation DeleteTask ($id: ID!, $user_id: ID!) {
    deleteTask (id: $id, user_id: $user_id)
  }`;

export const CREATE_TASK = gql`
  mutation CreateTask($task: String!, $user_id: ID!) {
    createTask (task: $task, user_id: $user_id) {
      id
      task
      status
    }
  }`

export const TASK_UPDATE = gql`
  mutation UpdateTask ($id: ID!, $task: String!, $status: String!, $user_id: ID!) {
    updateTask(id: $id, task: $task, status: $status, user_id: $user_id) {
      id
      task
      status
    }
  }`;