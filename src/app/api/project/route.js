import { getCollection } from "../lib/mongodb";
import { requireAuth } from "../lib/auth";

export async function GET(req) {
  // any authenticated user can fetch aggregate project data (first project)
  try {
    requireAuth(req);
  } catch (res) {
    return res;
  }

  try {
    const col = await getCollection("projects");
    const project = await col.findOne({}, { sort: { createdAt: 1 } });
    // if no projects yet, fallback to old config collection to avoid breaking
    if (!project) {
      const cfg = await getCollection("config");
      const data = await cfg.findOne({ _id: "project" });
      const result = data ? { ...data, _id: undefined } : {};
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    // return project directly
    return new Response(JSON.stringify(project), {
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

export async function POST(request) {
  // kept for compatibility, simply redirect to projects endpoint if admin
  try {
    requireAuth(request, ["admin"]);
  } catch (res) {
    return res;
  }

  try {
    const body = await request.json();
    const col = await getCollection("config");
    await col.updateOne(
      { _id: "project" },
      { $set: body },
      { upsert: true }
    );
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