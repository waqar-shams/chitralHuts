// /src/app/api/lib/auth.js
import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET || "access-secret";
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || "refresh-secret";

// Sign access token
export function signAccessToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, ACCESS_SECRET, {
    expiresIn: "15m",
  });
}

// Sign refresh token
export function signRefreshToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, REFRESH_SECRET, {
    expiresIn: "7d",
  });
}

// ✅ Add this function
export function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET);
}