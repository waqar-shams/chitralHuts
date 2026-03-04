import { getCollection } from "../lib/mongodb";
import { requireAuth } from "../lib/auth";

async function generateProjectId(col, name) {
  // build prefix by stripping vowels and non-letters, then taking first three chars
  const letters = (name.match(/[A-Za-z]/g) || []).join("");
  // remove vowels
  const consonants = letters.replace(/[AEIOUaeiou]/g, "");
  let prefix = consonants.substring(0, 3).toUpperCase();
  if (prefix.length < 3) {
    // fallback to first letters if not enough consonants
    prefix = letters.substring(0, 3).toUpperCase();
  }
  prefix = prefix.padEnd(3, "X");

  const year = new Date().getFullYear();
  // count existing projects with same prefix-year
  const re = new RegExp(`^${prefix}-${year}-(\\d{3})$`);
  const count = await col.countDocuments({ id: { $regex: re } });
  const seq = String(count + 1).padStart(3, "0");
  return `${prefix}-${year}-${seq}`;
}

export async function GET(req) {
  // any authenticated user can fetch project list
  try {
    requireAuth(req);
  } catch (res) {
    return res;
  }

  try {
    const col = await getCollection("projects");
    const all = await col.find({}).sort({ createdAt: 1 }).toArray();
    return new Response(JSON.stringify(all), {
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
  // admin only
  try {
    requireAuth(req, ["admin"]);
  } catch (res) {
    return res;
  }

  try {
    const body = await req.json();
    const col = await getCollection("projects");

    const nameForId =
      (body.project && (body.project.name || body.project.location)) ||
      body.name ||
      "";
    if (!nameForId) {
      return new Response(JSON.stringify({ error: "Project name/location is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const id = await generateProjectId(col, nameForId);
    const now = new Date();
    // ensure nested project object has id as well (for dashboard compatibility)
    const project = {
      ...body,
      id,
      createdAt: now,
      updatedAt: now,
      breakdown: body.breakdown || [],
      milestones: body.milestones || [],
      progressUpdates: body.progressUpdates || [],
    };
    if (project.project && typeof project.project === "object") {
      project.project.id = id;
    }

    await col.insertOne(project);

    return new Response(JSON.stringify(project), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
