import { NextResponse } from "next/server";
import Stripe from "stripe";
import Order from "@/lib/models/Order";
import { connectDB } from "@/lib/mongodb";
import { env } from "@/env";

const stripe = env.STRIPE_SECRET_KEY ? new Stripe(env.STRIPE_SECRET_KEY) : null;

const endpointSecret = env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event;

  try {
    if (!stripe || !endpointSecret || !sig) {
      return NextResponse.json(
        { success: false, error: "Stripe webhook configuration is incomplete" },
        { status: 400 }
      );
    }

    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: unknown) {
    console.error(`Webhook Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    return NextResponse.json({ success: false, error: err instanceof Error ? err.message : "Webhook Error" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    
    await connectDB();
    
    const order = await Order.findOne({ stripeSessionId: session.id });
    if (order) {
      order.status = "completed";
      order.customerName = session.customer_details?.name || order.customerName;
      await order.save();
      
      console.log(`Order completed for ${order.customerEmail}`);
      // TODO: Send confirmation email with the secure downloadToken
    }
  }

  return NextResponse.json({ received: true });
}
