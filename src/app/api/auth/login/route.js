import { NextResponse } from "next/server";
import { getCollection, ensureInitialUsers } from "../../lib/mongodb";
import { signAccessToken, signRefreshToken } from "../../lib/auth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // ensure initial users exist
    await ensureInitialUsers();
    
    const col = await getCollection("users");
    const userRecord = await col.findOne({ email, password });

    if (!userRecord) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const user = { id: userRecord.id, email: userRecord.email, role: userRecord.role };

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    const response = NextResponse.json({ accessToken });

    // set session cookie (no maxAge) so the token is cleared when the browser/tab closes
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      path: "/",
      // no maxAge or expires -> session cookie
    });

    return response;
  } catch (err) {
    console.error("Login API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}