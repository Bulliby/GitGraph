import gql from 'graphql-tag'

export const REPOSITORIES = gql`
{
    user(login: "bulliby")
    {
        id,
        repositories(first:100){
            nodes {
                name
                id
            }
        }
    }
}`
