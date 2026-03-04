import { getCollection, ensureInitialUsers } from "../lib/mongodb";
import { requireAuth } from "../lib/auth";

export async function GET(req) {
  try {
    requireAuth(req, ["admin"]);
  } catch (res) {
    return res;
  }

  try {
    await ensureInitialUsers();
    const col = await getCollection("users");
    const users = await col.find({}).toArray();
    // remove passwords before sending
    const safe = users.map(({ password, ...u }) => u);
    return new Response(JSON.stringify(safe), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    requireAuth(req, ["admin"]);
  } catch (res) {
    return res;
  }

  try {
    const body = await req.json();
    if (!body.email || !body.password || !body.role) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }
    const col = await getCollection("users");
    const exists = await col.findOne({ email: body.email });
    if (exists) {
      return new Response(JSON.stringify({ error: "User exists" }), { status: 400 });
    }
    const lastUser = await col.findOne({}, { sort: { id: -1 } });
    const id = lastUser ? lastUser.id + 1 : 1;
    await col.insertOne({ id, ...body });
    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}