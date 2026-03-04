import { getCollection } from "../lib/mongodb";
import { requireAuth } from "../lib/auth";

export async function GET(req) {
  // require authentication
  let payload;
  try {
    payload = requireAuth(req);
  } catch (res) {
    return res;
  }

  try {
    const url = new URL(req.url);
    const userIdParam = url.searchParams.get("userId");
    const col = await getCollection("user_transactions");

    if (payload.role === "admin") {
      if (userIdParam) {
        const doc = await col.findOne({ userId: parseInt(userIdParam, 10) });
        return new Response(JSON.stringify(doc?.transactions || []), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      // return all for admin
      const all = await col.find({}).toArray();
      const mapping = {};
      all.forEach(doc => {
        mapping[doc.userId] = doc.transactions || [];
      });
      return new Response(JSON.stringify(mapping), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // regular user: get their own transactions
    const doc = await col.findOne({ userId: payload.id });
    return new Response(JSON.stringify(doc?.transactions || []), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req) {
  // only admin may set transactions
  try {
    requireAuth(req, ["admin"]);
  } catch (res) {
    return res;
  }

  try {
    const body = await req.json();
    const { userId, transactions, id, date, time, description, details, status, amount } = body;
    
    if (!userId) {
      return new Response(JSON.stringify({ error: "userId is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const col = await getCollection("user_transactions");

    // If it's an array of transactions (bulk upload), replace all
    if (Array.isArray(transactions)) {
      await col.updateOne(
        { userId: parseInt(userId, 10) },
        { $set: { transactions } },
        { upsert: true }
      );
    } else if (id) {
      // If it's a single transaction, add/create it
      if (!date || !time || !description || !status || !amount) {
        return new Response(
          JSON.stringify({ error: "id, date, time, description, status, and amount are required" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      const transaction = {
        id,
        date,
        time,
        description,
        details: details || "",
        status,
        amount,
      };

      await col.updateOne(
        { userId: parseInt(userId, 10) },
        { $push: { transactions: transaction } },
        { upsert: true }
      );
    } else {
      return new Response(
        JSON.stringify({ error: "Either transactions array or transaction fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}