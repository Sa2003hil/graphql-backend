import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { prismaClient } from './lib/db'

async function init () {
  const app = express()
  const PORT = Number(process.env.PORT) || 8000

  app.use(express.json())

  //  Create  GraphQl server
  const gqlserver = new ApolloServer({
    typeDefs: `
       type Query{
        hello: String
        say(name:String):String
       }

       type Mutation{
        createUser(firstName:String!,lastName:String!,email:String!, password:String!): Boolean
       }
    `,
    resolvers: {
      Query: {
        hello: () => 'Hey there, I am a graphQL server',
        say: (_, { name }: { name: String }) => `Hey ${name} , How are you ?`
      },
      Mutation: {
        createUser: async (
          _,
          {
            firstName,
            lastName,
            email,
            password
          }: {
            firstName: string
            lastName: string
            email: string
            password: string
          }
        ) => {
          await prismaClient.user.create({
            data: {
              firstName,
              lastName,
              email,
              password,
              salt: 'Random_Salt'
            }
          })
          return true
        }
      }
    }
  })

  //  Start the gql server
  await gqlserver.start()

  app.get('/', (req, res) => {
    res.json({
      message: 'server is up and running'
    })
  })

  app.use('/graphql', expressMiddleware(gqlserver))

  app.listen(PORT, () => console.log(`Port is running on ${PORT}`))
}

init()
