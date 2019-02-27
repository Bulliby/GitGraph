import gql from 'graphql-tag'

export const REPOSITORIES = gql`query user($login: String!) {
    user(login: $login)
    {
        repositories(first:100){
            nodes {
                name,
                stargazers(first:100) {
                    nodes {
                        name
                    }
                }
            }
        }
    }
}`
