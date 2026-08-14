"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Subscriber from "@/lib/models/Subscriber";
import Campaign from "@/lib/models/Campaign";

// METRICS
export async function getDashboardMetrics() {
  try {
    await connectDB();
    
    const totalSubscribers = await Subscriber.countDocuments({ status: "Subscribed" });
    
    // Calculate Average Open Rate
    const campaigns = await Campaign.find({ status: "Sent" }).select("opens recipients").lean();
    let totalOpens = 0;
    let totalRecipients = 0;
    
    campaigns.forEach(c => {
      totalOpens += c.opens || 0;
      totalRecipients += c.recipients || 0;
    });
    
    const avgOpenRate = totalRecipients > 0 ? ((totalOpens / totalRecipients) * 100).toFixed(1) : "0.0";
    
    return {
      totalSubscribers,
      avgOpenRate: `${avgOpenRate}%`,
      emailsSent: totalRecipients
    };
  } catch (error) {
    console.error("Error fetching metrics:", error);
    return { totalSubscribers: 0, avgOpenRate: "0.0%", emailsSent: 0 };
  }
}

// SUBSCRIBERS
export async function getSubscribers(query: string = "") {
  try {
    await connectDB();
    const filter = query ? {
      $or: [
        { email: { $regex: query, $options: "i" } },
        { name: { $regex: query, $options: "i" } }
      ]
    } : {};
    
    const subscribers = await Subscriber.find(filter).sort({ subscribedAt: -1 }).lean();
    return JSON.parse(JSON.stringify(subscribers));
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return [];
  }
}

export async function addSubscriber(data: { email: string; name?: string }) {
  try {
    await connectDB();
    const sub = await Subscriber.create(data);
    revalidatePath("/dashboard/newsletter");
    return { success: true, subscriber: JSON.parse(JSON.stringify(sub)) };
  } catch (error: any) {
    console.error("Error adding subscriber:", error);
    if (error.code === 11000) return { success: false, error: "Email already exists" };
    return { success: false, error: "Failed to add subscriber" };
  }
}

export async function deleteSubscriber(id: string) {
  try {
    await connectDB();
    await Subscriber.findByIdAndDelete(id);
    revalidatePath("/dashboard/newsletter");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete subscriber" };
  }
}

// CAMPAIGNS
export async function getCampaigns() {
  try {
    await connectDB();
    const campaigns = await Campaign.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(campaigns));
  } catch (error) {
    return [];
  }
}

export async function createCampaign(data: any) {
  try {
    await connectDB();
    const campaign = await Campaign.create(data);
    revalidatePath("/dashboard/newsletter");
    return { success: true, campaign: JSON.parse(JSON.stringify(campaign)) };
  } catch (error) {
    return { success: false, error: "Failed to create campaign" };
  }
}

export async function updateCampaign(id: string, data: any) {
  try {
    await connectDB();
    const updated = await Campaign.findByIdAndUpdate(id, data, { new: true }).lean();
    revalidatePath("/dashboard/newsletter");
    return { success: true, campaign: JSON.parse(JSON.stringify(updated)) };
  } catch (error) {
    return { success: false, error: "Failed to update campaign" };
  }
}

export async function deleteCampaign(id: string) {
  try {
    await connectDB();
    await Campaign.findByIdAndDelete(id);
    revalidatePath("/dashboard/newsletter");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete campaign" };
  }
}

export async function duplicateCampaign(id: string) {
  try {
    await connectDB();
    const original = await Campaign.findById(id).lean();
    if (!original) throw new Error("Not found");
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, createdAt, updatedAt, sentAt, ...rest } = original as any;
    
    const duplicate = await Campaign.create({
      ...rest,
      subject: `${rest.subject} (Copy)`,
      status: "Draft",
      opens: 0,
      clicks: 0,
      recipients: 0
    });
    
    revalidatePath("/dashboard/newsletter");
    return { success: true, campaign: JSON.parse(JSON.stringify(duplicate)) };
  } catch (error) {
    return { success: false, error: "Failed to duplicate" };
  }
}

export async function sendCampaign(id: string) {
  try {
    await connectDB();
    const campaign = await Campaign.findById(id);
    if (!campaign) throw new Error("Campaign not found");
    
    const subscribersCount = await Subscriber.countDocuments({ status: "Subscribed" });
    
    // MOCK SENDING LOGIC (Normally you would call Resend API here)
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({ from: '...', to: subscribers, subject: campaign.subject, html: campaign.content });

    campaign.status = "Sent";
    campaign.sentAt = new Date();
    campaign.recipients = subscribersCount;
    // Simulate some opens/clicks for the demo
    campaign.opens = Math.floor(subscribersCount * 0.4); 
    campaign.clicks = Math.floor(subscribersCount * 0.1);

    await campaign.save();
    revalidatePath("/dashboard/newsletter");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to send campaign" };
  }
}
