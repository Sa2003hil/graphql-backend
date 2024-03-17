import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'

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
    `,
    resolvers: {
      Query: {
        hello: () => 'Hey there, I am a graphQL server',
        say: (_, { name }: { name: String }) => `Hey ${name} , How are you ?`
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
