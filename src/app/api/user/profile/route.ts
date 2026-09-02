import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { z } from "zod";

const ProfileUpdateSchema = z.object({
  name: z.string().optional(),
  username: z.string().optional(),
  bio: z.string().optional(),
});

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email }).lean();

    if (!user) {
      // First time login, create basic user record from Google data
      const newUser = await User.create({
        email: session.user.email,
        name: session.user.name || "",
        image: session.user.image || "",
      });
      return NextResponse.json({ user: newUser.toObject() });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validated = ProfileUpdateSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
    }
    const { name, username, bio } = validated.data;

    await connectDB();

    // Check if username is already taken by someone else
    if (username) {
      const existingUsername = await User.findOne({ 
        username, 
        email: { $ne: session.user.email } 
      });
      if (existingUsername) {
        return NextResponse.json(
          { error: "Username is already taken." },
          { status: 400 }
        );
      }
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: { name, username, bio } },
      { new: true, upsert: true }
    ).lean();

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
