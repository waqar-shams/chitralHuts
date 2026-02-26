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

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err) {
    console.error("Login API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}