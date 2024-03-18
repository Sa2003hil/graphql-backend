import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { prismaClient } from './lib/db'

import createAppoloGraphqlServer from './graphql'

async function init () {
  const app = express()
  const PORT = Number(process.env.PORT) || 8000

  app.use(express.json())

  const gqlserver = await createAppoloGraphqlServer()

  app.get('/', (req, res) => {
    res.json({
      message: 'server is up and running'
    })
  })

  app.use('/graphql', expressMiddleware(gqlserver))

  app.listen(PORT, () => console.log(`Port is running on ${PORT}`))
}

init()
