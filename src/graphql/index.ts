import { ApolloServer } from '@apollo/server'
import { User } from './user'

async function createAppoloGraphqlServer () {
  //  Create  GraphQl server
  const gqlserver = new ApolloServer({
    typeDefs: `
       type Query{
      ${User.queries}
       }

       type Mutation{
        ${User.mutations}
       }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries
      },
      Mutation: {
        ...User.resolvers.mutations
      }
    }
  })

  //  Start the gql server
  await gqlserver.start()
  return gqlserver
}

export default createAppoloGraphqlServer
