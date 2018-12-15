import gql from 'graphql-tag'

export const REPOSITORIES = gql`
{
    user(login: "bulliby")
    {
        repositories(first:100){
            nodes {
                name
            }
        }
    }
}`
