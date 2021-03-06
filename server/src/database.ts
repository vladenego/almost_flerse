import { MongoClient } from 'mongodb'

/** creates database connection */
export const createDatabase = async () => {
  const client = await new MongoClient('mongodb://localhost:27017/almost-flerse-dev', {
    useUnifiedTopology: true,
  }).connect()

  return client.db()
}
