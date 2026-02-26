import { NextResponse } from "next/server";
import { signAccessToken, signRefreshToken } from "../../lib/auth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Fake DB check
    if (email !== "user@example.com" || password !== "Passw0rd!") {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const user = { id: 1, email };

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