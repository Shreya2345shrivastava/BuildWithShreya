import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/mongodb";
import { Notification } from "@/models/Notification";
import { Bell, Users, FileText, Settings, BookOpen, AlertCircle, MessageSquare } from "lucide-react";
import { revalidatePath } from "next/cache";

async function generateSampleNotifications() {
  "use server";
  await connectDB();
  
  const count = await Notification.countDocuments();
  if (count === 0) {
    const samples = [
      {
        title: "Welcome to BuildWithShreya",
        message: "Your new dashboard is ready to go. Explore settings to configure your digital storefront.",
        type: "system",
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 5) // 5 mins ago
      },
      {
        title: "New Subscriber",
        message: "Sarah Jenkins just subscribed to your newsletter.",
        type: "subscriber",
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
      },
      {
        title: "New Book Sale",
        message: "Someone just purchased 'The Calm Creator'.",
        type: "purchase",
        isRead: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
      }
    ];
    await Notification.insertMany(samples);
  }
}

export default async function NotificationsPage() {
  await connectDB();
  
  // Try generating samples if empty
  await generateSampleNotifications();

  // Fetch all notifications
  const notifications = await Notification.find().sort({ createdAt: -1 });

  const getIcon = (type: string) => {
    switch (type) {
      case "subscriber": return <Users size={18} strokeWidth={1.5} />;
      case "purchase": return <BookOpen size={18} strokeWidth={1.5} />;
      case "system": return <Settings size={18} strokeWidth={1.5} />;
      case "comment": return <MessageSquare size={18} strokeWidth={1.5} />;
      case "resource": return <FileText size={18} strokeWidth={1.5} />;
      default: return <AlertCircle size={18} strokeWidth={1.5} />;
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="border-b border-black/[0.04] dark:border-[#2a332d] pb-6">
        <h1 className="font-serif text-4xl text-[var(--color-text-primary)]">Notifications</h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          Stay updated with your platform's activity.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-black/[0.04] dark:border-[#2a332d] bg-[var(--color-surface-elevated)] dark:bg-[#242b28] py-20 text-center shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-bg-ivory)] dark:bg-[#131715] text-[var(--color-text-secondary)]">
              <Bell size={24} />
            </div>
            <h3 className="mt-6 font-serif text-2xl text-[var(--color-text-primary)]">All Caught Up</h3>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              You don't have any new notifications right now.
            </p>
          </div>
        ) : (
          notifications.map((notif: { _id: string; title: string; message: string; type: string; read: boolean; createdAt: string | Date }) => {
            const isUnread = !notif.read;
            const days = Math.floor((new Date().getTime() - new Date(notif.createdAt).getTime()) / (1000 * 60 * 60 * 24));
            const hours = Math.floor((new Date().getTime() - new Date(notif.createdAt).getTime()) / (1000 * 60 * 60));
            const mins = Math.floor((new Date().getTime() - new Date(notif.createdAt).getTime()) / (1000 * 60));
            
            let timeAgo = "Just now";
            if (days > 0) timeAgo = days === 1 ? "Yesterday" : `${days} days ago`;
            else if (hours > 0) timeAgo = `${hours} hours ago`;
            else if (mins > 0) timeAgo = `${mins} mins ago`;

            return (
              <div 
                key={notif._id.toString()} 
                className={`relative flex items-start gap-5 rounded-2xl border ${isUnread ? 'border-[var(--color-accent-peach)]/30 bg-[var(--color-accent-peach)]/5' : 'border-black/[0.04] dark:border-[#2a332d] bg-[var(--color-surface-elevated)] dark:bg-[#242b28]'} p-6 shadow-sm transition-all hover:border-[var(--color-accent-peach)]/50`}
              >
                {isUnread && (
                  <div className="absolute right-6 top-6 h-2.5 w-2.5 rounded-full bg-[var(--color-accent-peach)]" />
                )}
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${isUnread ? 'bg-[var(--color-accent-peach)]/10 text-[var(--color-accent-peach)]' : 'bg-[var(--color-bg-ivory)] dark:bg-[#131715] text-[var(--color-text-secondary)]'}`}>
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-medium ${isUnread ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}>
                      {notif.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                    {notif.message}
                  </p>
                  <p className="mt-3 text-xs font-medium text-[var(--color-text-secondary)] opacity-70">
                    {timeAgo}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
