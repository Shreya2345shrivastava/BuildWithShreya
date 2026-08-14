import { NextResponse } from "next/server";
import Stripe from "stripe";
import Order from "@/lib/models/Order";
import { connectDB } from "@/lib/mongodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock", {
  apiVersion: "2024-04-10" as any,
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event;

  try {
    if (endpointSecret && sig) {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } else {
      // For local testing without webhooks set up
      event = JSON.parse(body);
    }
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    
    await connectDB();
    
    const order = await Order.findOne({ stripeSessionId: session.id });
    if (order) {
      order.status = "completed";
      order.customerEmail = session.customer_details?.email || order.customerEmail;
      order.customerName = session.customer_details?.name || order.customerName;
      await order.save();
      
      console.log(`Order completed for ${order.customerEmail}`);
      // TODO: Send confirmation email with the secure downloadToken
    }
  }

  return NextResponse.json({ received: true });
}
