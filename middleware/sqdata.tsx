import { Db, MongoClient } from "mongodb";

const MONGODB_URI_SQ = process.env.MONGODB_URI_SQ;
const MONGODB_DB_SQ = process.env.MONGODB_DB_SQ;

let cachedClient: MongoClient;
let cachedDb: Db;

export async function sqconnect() {
  // check the cached.
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  // set the connection options
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  // check the MongoDB URI
  if (!MONGODB_URI_SQ) {
    throw new Error("Define the MONGODB_URI environmental variable");
  }
  // check the MongoDB DB
  if (!MONGODB_DB_SQ) {
    throw new Error("Define the MONGODB_DB environmental variable");
  }

  // Connect to cluster
  let client = new MongoClient(MONGODB_URI_SQ);
  await client.connect();
  let db = client.db(MONGODB_DB_SQ);

  // set cache
  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}