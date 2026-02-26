import { NextResponse } from "next/server";
import { verifyRefreshToken, signAccessToken } from "../../lib/auth";

export async function POST(req) {
  const cookie = req.headers.get("cookie") || "";
  const refreshToken = cookie
    .split("; ")
    .find(c => c.startsWith("refreshToken="))
    ?.split("=")[1];

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  try {
    const payload = verifyRefreshToken(refreshToken);

    const newAccessToken = signAccessToken({
      id: payload.id,
      email: payload.email,
    });

    return NextResponse.json({ accessToken: newAccessToken });
  } catch {
    return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 });
  }
}