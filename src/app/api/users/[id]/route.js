import { getCollection } from "../../lib/mongodb";
import { requireAuth } from "../../lib/auth";

export async function DELETE(req, { params }) {
  try {
    requireAuth(req, ["admin"]);
  } catch (res) {
    return res;
  }

  try {
    const { id } = params;
    const col = await getCollection("users");
    const result = await col.deleteOne({ id: parseInt(id, 10) });
    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}