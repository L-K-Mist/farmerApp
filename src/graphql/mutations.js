import gql from 'graphql-tag'

// This is the GraphQL mutation that will handle creating new users on our GraphQL server. It takes the username, email, and password of a user. These variables will be passed from the SignUp component.
export const SIGNUP_MUTATION = gql `
mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
        token,
        user {
            name
            email
            
        }
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