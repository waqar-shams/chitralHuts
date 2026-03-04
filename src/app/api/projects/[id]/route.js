import { getCollection } from "../../lib/mongodb";
import { requireAuth } from "../../lib/auth";

export async function GET(req, { params }) {
  try {
    requireAuth(req);
  } catch (res) {
    return res;
  }

  try {
    const { id } = params;
    const col = await getCollection("projects");
    const project = await col.findOne({ id });
    if (!project) {
      return new Response(JSON.stringify({ error: "Project not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
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

export async function PUT(req, { params }) {
  // update project details or add progress/milestone
  try {
    requireAuth(req, ["admin"]);
  } catch (res) {
    return res;
  }

  try {
    const { id } = params;
    const body = await req.json();
    const col = await getCollection("projects");

    // determine update type
    const updates = { updatedAt: new Date() };

    if (body.progressUpdate) {
      updates.$push = { progressUpdates: body.progressUpdate };
    }
    if (body.milestone) {
      updates.$push = { ...(updates.$push || {}), milestones: body.milestone };
    }
    // allow arbitrary field updates in body.fields
    if (body.fields && typeof body.fields === "object") {
      updates.$set = { ...(updates.$set || {}), ...body.fields };
    }

    // if no special instructions, treat whole body as set (except id)
    if (!updates.$push && !updates.$set) {
      const { id: _ignore, createdAt, ...rest } = body;
      updates.$set = { ...rest };
    }

    const result = await col.updateOne({ id }, updates);
    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: "Project not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const project = await col.findOne({ id });
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

export async function DELETE(req, { params }) {
  try {
    requireAuth(req, ["admin"]);
  } catch (res) {
    return res;
  }

  try {
    const { id } = params;
    const col = await getCollection("projects");
    const result = await col.deleteOne({ id });
    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ error: "Project not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
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
