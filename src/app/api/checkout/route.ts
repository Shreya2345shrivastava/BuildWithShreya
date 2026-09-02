import { NextResponse } from "next/server";
import Stripe from "stripe";
import Order from "@/lib/models/Order";
import { connectDB } from "@/lib/mongodb";
import { randomBytes } from "crypto";
import { env } from "@/env";
import { z } from "zod";

const CheckoutSchema = z.object({
  bookId: z.string().min(1),
  price: z.number().optional(),
});

const stripe = new Stripe(env.STRIPE_SECRET_KEY || "sk_test_mock");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = CheckoutSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
    }
    const { bookId } = validated.data;
    
    // In a real app, fetch price from DB to prevent tampering
    const actualPrice = 29.99; 

    // Create a mock session if Stripe isn't configured yet
    if (!env.STRIPE_SECRET_KEY) {
      console.warn("No STRIPE_SECRET_KEY found. Using mock checkout flow.");
      await connectDB();
      const mockSessionId = "mock_session_" + Date.now();
      
      const newOrder = new Order({
        stripeSessionId: mockSessionId,
        customerEmail: "mock@example.com",
        customerName: "Mock User",
        bookId,
        amount: actualPrice,
        status: "pending",
        downloadToken: randomBytes(32).toString('hex')
      });
      await newOrder.save();

      // Redirect directly to success page since we're mocking
      return NextResponse.json({ url: `${env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id=${mockSessionId}` });
    }

    // REAL STRIPE FLOW
    const session = await stripe.checkout.sessions.create({
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
      }
    });

    await connectDB();
    
    // Create pending order
    const newOrder = new Order({
      stripeSessionId: session.id,
      customerEmail: "pending@checkout.com", // Will be updated via webhook
      bookId,
      amount: actualPrice,
      status: "pending",
      downloadToken: randomBytes(32).toString('hex')
    });
    
    await newOrder.save();

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
