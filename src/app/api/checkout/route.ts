import { NextResponse } from "next/server";
import Stripe from "stripe";
import Order from "@/lib/models/Order";
import { connectDB } from "@/lib/mongodb";
import { randomBytes } from "crypto";
import { env } from "@/env";
import { z } from "zod";
import { getServerSession } from "next-auth";

const CheckoutSchema = z.object({
  bookId: z.string().min(1),
  price: z.number().optional(),
});

const stripe = env.STRIPE_SECRET_KEY ? new Stripe(env.STRIPE_SECRET_KEY) : null;

export async function POST(req: Request) {
  try {
    const authSession = await getServerSession();
    if (!authSession?.user?.email) {
      return NextResponse.json({ error: "Please sign in before purchasing" }, { status: 401 });
    }

    const customerEmail = authSession.user.email.toLowerCase();
    const body = await req.json();
    const validated = CheckoutSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
    }
    const { bookId } = validated.data;
    
    if (!stripe) {
      return NextResponse.json(
        { error: "Checkout is unavailable until Stripe is configured" },
        { status: 503 }
      );
    }

    const actualPrice = 29.99;

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "First Build It, Then Make It Beautiful",
              images: [`${env.NEXT_PUBLIC_APP_URL}/images/books/book-cover.jpeg`],
            },
            unit_amount: Math.round(actualPrice * 100), // cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.NEXT_PUBLIC_APP_URL}/books/${bookId}`,
      metadata: {
        bookId,
        customerEmail,
      }
    });

    await connectDB();
    
    const newOrder = new Order({
      stripeSessionId: stripeSession.id,
      customerEmail,
      customerName: authSession.user.name || undefined,
      bookId,
      amount: actualPrice,
      status: "pending",
      downloadToken: randomBytes(32).toString('hex')
    });
    
    await newOrder.save();

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
