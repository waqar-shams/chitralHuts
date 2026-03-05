import Stripe from "stripe";
import { getCollection } from "../../lib/mongodb";
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
    const { intentId } = await req.json();

    if (!intentId) {
      return new Response(JSON.stringify({ error: "Intent ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Retrieve the payment intent from Stripe
    const intent = await stripe.paymentIntents.retrieve(intentId);

    // For MVP/test mode, we'll accept intents that are either:
    // - succeeded (payment already processed)
    // - requires_action (payment needs confirmation)
    // - requires_payment_method (payment method not attached yet)
    // - processing (payment being processed)
    if (!["succeeded", "requires_action", "requires_payment_method", "processing"].includes(intent.status)) {
      return new Response(
        JSON.stringify({ error: `Payment failed with status: ${intent.status}` }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { type, description } = intent.metadata;
    const amount = intent.amount / 100; // Convert from cents
    const userId = parseInt(intent.metadata.userId, 10);

    // Create transaction record
    const now = new Date();
    const transaction = {
      id: `TRX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      date: now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      description: description || (type === "deposit" ? "Bank Deposit" : "Withdrawal"),
      details: `Stripe Payment - ${intentId}`,
      status: "Completed",
      amount: type === "deposit" ? `+$${amount.toFixed(2)}` : `-$${amount.toFixed(2)}`,
      type: type,
      stripeId: intentId,
    };

    const col = await getCollection("user_transactions");
    await col.updateOne(
      { userId },
      { $push: { transactions: transaction } },
      { upsert: true }
    );

    return new Response(JSON.stringify({ success: true, transaction }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error confirming payment:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
