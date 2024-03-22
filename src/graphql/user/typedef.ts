//  It is the schema definition for the user module

export const typeDefs = `#graphql
    Type Query{
        user(id: ID!): User
        users: [User]
    }

`
