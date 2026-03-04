import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/chitralHuts";

let cachedClient = null;
let cachedDb = null;

async function connect() {
  if (cachedDb) return cachedDb;
  if (!cachedClient) {
    cachedClient = new MongoClient(uri);
    await cachedClient.connect();
  }
  cachedDb = cachedClient.db();
  return cachedDb;
}

async function getCollection(name) {
  const db = await connect();
  return db.collection(name);
}

// Ensure initial admin + regular user exist when DB is empty
async function ensureInitialUsers() {
  const col = await getCollection("users");
  const count = await col.countDocuments();
  if (count === 0) {
    await col.insertMany([
      { id: 1, email: "admin@example.com", password: "Admin123!", role: "admin" },
      { id: 2, email: "user@example.com", password: "Passw0rd!", role: "user" },
    ]);
  }
}

export { connect, getCollection, ensureInitialUsers };
