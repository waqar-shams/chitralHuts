import Stripe from "stripe";
import { requireAuth } from "../../lib/auth";

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

export async function POST(req) {
  // Require authentication
  let payload;
  try {
    payload = requireAuth(req);
  } catch (res) {
    return res;
  }

  // Check if Stripe is configured
  if (!stripe) {
    return new Response(JSON.stringify({ error: "Payment processing is not configured" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { amount, type, description } = await req.json();

    if (!amount || amount <= 0) {
      return new Response(JSON.stringify({ error: "Invalid amount" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!["deposit", "withdrawal"].includes(type)) {
      return new Response(JSON.stringify({ error: "Invalid transaction type" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const intent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: "usd",
      payment_method_types: ["card"],
      metadata: {
        userId: payload.id,
        type: type,
        description: description || "",
      },
    });

    return new Response(
      JSON.stringify({
        clientSecret: intent.client_secret,
        intentId: intent.id,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Stripe error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
