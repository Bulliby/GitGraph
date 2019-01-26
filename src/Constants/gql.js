import gql from 'graphql-tag'

export const REPOSITORIES = gql`
{
    user(login: $name)
    {
        repositories(first:100){
            nodes {
                name
            }
        }
    }
}`
