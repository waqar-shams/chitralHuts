import { getCollection } from "../../lib/mongodb";
import { requireAuth } from "../../lib/auth";

export async function PUT(req, { params }) {
  // Update transaction - admin only
  try {
    requireAuth(req, ["admin"]);
  } catch (res) {
    return res;
  }

  try {
    const { id } = params;
    const body = await req.json();
    const { userId, date, time, description, details, status, amount } = body;

    if (!userId || !id) {
      return new Response(
        JSON.stringify({ error: "userId and id are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const col = await getCollection("user_transactions");
    
    const result = await col.updateOne(
      { userId: parseInt(userId, 10) },
      {
        $set: {
          "transactions.$[elem]": {
            id,
            date,
            time,
            description,
            details,
            status,
            amount,
          },
        },
      },
      {
        arrayFilters: [{ "elem.id": id }],
        upsert: false,
      }
    );

    if (result.matchedCount === 0) {
      return new Response(
        JSON.stringify({ error: "Transaction or user not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
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

export async function DELETE(req, { params }) {
  // Delete transaction - admin only
  try {
    requireAuth(req, ["admin"]);
  } catch (res) {
    return res;
  }

  try {
    const { id } = params;
    const body = await req.json();
    const { userId } = body;

    if (!userId || !id) {
      return new Response(
        JSON.stringify({ error: "userId and id are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const col = await getCollection("user_transactions");

    const result = await col.updateOne(
      { userId: parseInt(userId, 10) },
      {
        $pull: { transactions: { id } },
      }
    );

    if (result.matchedCount === 0) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    if (result.modifiedCount === 0) {
      return new Response(
        JSON.stringify({ error: "Transaction not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
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
