import gql from 'graphql-tag'

export const ME_QUERY = gql `
    query MeQuery {
        me {
            id
            name
            email
        }
    }
`

export const LOGIN_MUTATION = gql `
mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
    }
}
`