// /src/app/api/lib/auth.js
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET || "access-secret";
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || "refresh-secret";

// Sign access token (includes role if provided)
export function signAccessToken(user) {
  const payload = { id: user.id, email: user.email };
  if (user.role) payload.role = user.role;
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: "15m",
  });
}

// Sign refresh token (also include role so we can issue new access with role)
export function signRefreshToken(user) {
  const payload = { id: user.id, email: user.email };
  if (user.role) payload.role = user.role;
  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: "7d",
  });
}

// verify access token
export function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_SECRET);
}

// helper to extract and verify token from request; throws NextResponse if not authorized
export function requireAuth(req, roles = []) {
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;
  if (!token) {
    throw new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  let payload;
  try {
    payload = verifyAccessToken(token);
  } catch (err) {
    throw new NextResponse(JSON.stringify({ error: "Invalid token" }), { status: 401 });
  }

  if (roles.length && !roles.includes(payload.role)) {
    throw new NextResponse(JSON.stringify({ error: "Forbidden" }), { status: 403 });
  }

  return payload;
}

// ✅ Add this function
export function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET);
}