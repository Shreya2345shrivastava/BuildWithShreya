import { getServerSession } from "next-auth";
import Link from "next/link";
import { 
  BookOpen, 
  FileText, 
  PenTool, 
  Users, 
  ArrowUpRight,
  PlusCircle,
  Send
} from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import { Book } from "@/models/Book";
import Subscriber from "@/lib/models/Subscriber";

export default async function DashboardOverview() {
  const session = await getServerSession();
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  await connectDB();
  const totalBooks = await Book.countDocuments();
  const recentBooks = await Book.find().sort({ createdAt: -1 }).limit(4);
  const totalSubscribers = await Subscriber.countDocuments({ status: "Subscribed" });

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium uppercase tracking-widest text-[var(--color-accent-peach)]">
          {currentDate}
        </p>
        <h1 className="font-serif text-4xl text-[var(--color-text-primary)]">
          Good morning, {session?.user?.name || "Shreya"}.
        </h1>
        <p className="max-w-2xl text-lg text-[var(--color-text-secondary)]">
          Here&apos;s what&apos;s happening with your platform today.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Books", value: totalBooks.toString(), icon: BookOpen, trend: "Real-time from DB", href: "/dashboard/books/manage" },
          { label: "Resources", value: "0", icon: FileText, trend: "Coming soon", href: "/dashboard/resources" },
          { label: "Blog Posts", value: "0", icon: PenTool, trend: "Coming soon", href: "/dashboard/blogs" },
          { label: "Subscribers", value: totalSubscribers.toString(), icon: Users, trend: "Real-time from DB", href: "/dashboard/newsletter" },
        ].map((metric) => (
          <Link href={metric.href} key={metric.label} className="group flex flex-col justify-between rounded-2xl border border-[var(--color-border-soft)] dark:border-[#2a332d] bg-[var(--color-surface-elevated)] dark:bg-[#242b28] p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
            <div className="flex items-start justify-between">
              <div className="rounded-xl bg-[var(--color-bg-ivory)] dark:bg-[#131715] p-3 text-[var(--color-accent-peach)] transition-colors group-hover:bg-[var(--color-accent-peach)] group-hover:text-white">
                <metric.icon size={20} strokeWidth={1.5} />
              </div>
              <ArrowUpRight size={16} className="text-[var(--color-text-secondary)] transition-all group-hover:text-[var(--color-accent-peach)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-sans font-semibold tracking-tight text-[var(--color-text-primary)]">{metric.value}</h3>
              <p className="text-sm font-medium text-[var(--color-text-secondary)]">{metric.label}</p>
            </div>
            <div className="mt-4 border-t border-[var(--color-border-soft)] dark:border-[#2a332d] pt-4">
              <p className="text-xs font-medium text-[var(--color-text-primary)]">{metric.trend}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_350px]">
        {/* Activity Feed */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl text-[var(--color-text-primary)]">Recent Activity</h2>
          <div className="rounded-2xl border border-[var(--color-border-soft)] dark:border-[#2a332d] bg-[var(--color-surface-elevated)] dark:bg-[#242b28] shadow-sm">
            <div className="flex flex-col">
              {recentBooks.length > 0 ? recentBooks.map((book: { _id: string; title: string; category?: string; status: string; views?: number; createdAt: string | Date }, i: number) => {
                const days = Math.floor((new Date().getTime() - new Date(book.createdAt).getTime()) / (1000 * 60 * 60 * 24));
                const timeAgo = days === 0 ? "Today" : days === 1 ? "Yesterday" : `${days} days ago`;
                return (
                  <div key={i} className="flex items-center gap-4 border-b border-[var(--color-border-soft)] dark:border-[#2a332d] p-5 last:border-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-ivory)] dark:bg-[#131715] text-[var(--color-accent-peach)]">
                      <BookOpen size={16} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--color-text-primary)]">Added book &apos;{book.title}&apos;</p>
                      <p className="text-xs text-[var(--color-text-secondary)]">{timeAgo}</p>
                    </div>
                  </div>
                );
              }) : (
                <div className="p-8 text-center text-sm text-[var(--color-text-secondary)]">
                  No recent activity found.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl text-[var(--color-text-primary)]">Quick Actions</h2>
          <div className="flex flex-col gap-3">
            {[
              { label: "Write Blog Post", href: "/dashboard/blogs", icon: PenTool },
              { label: "Add Resource", href: "/dashboard/resources", icon: FileText },
              { label: "Create Newsletter", href: "/dashboard/newsletter", icon: Send },
              { label: "Add Book", href: "/dashboard/books", icon: PlusCircle },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="group flex items-center justify-between rounded-2xl border border-[var(--color-border-soft)] dark:border-[#2a332d] bg-[var(--color-surface-elevated)] dark:bg-[#242b28] p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
              >
                <div className="flex items-center gap-3">
                  <action.icon size={18} className="text-[var(--color-text-secondary)] transition-colors group-hover:text-[var(--color-accent-peach)]" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">{action.label}</span>
                </div>
                <ArrowUpRight size={16} className="text-[var(--color-text-secondary)] opacity-0 transition-all group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
