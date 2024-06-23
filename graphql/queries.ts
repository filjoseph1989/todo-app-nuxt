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
  query FetchTask {
    task {
      id
      task
      status
    }
  }`;