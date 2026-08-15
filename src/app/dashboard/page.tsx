"use client";

import { useSession } from "next-auth/react";
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


export default function DashboardOverview() {
  const { data: session } = useSession();
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium uppercase tracking-widest text-[#D9895B]">
          {currentDate}
        </p>
        <h1 className="font-serif text-4xl text-[#3A332D]">
          Good morning, {session?.user?.name || "Shreya"}.
        </h1>
        <p className="max-w-2xl text-lg text-[#8A837D]">
          Here&apos;s what&apos;s happening with your platform today.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Books", value: "4", icon: BookOpen, trend: "+1 this month" },
          { label: "Resources", value: "12", icon: FileText, trend: "+3 this month" },
          { label: "Blog Posts", value: "28", icon: PenTool, trend: "2 drafts pending" },
          { label: "Subscribers", value: "12,450", icon: Users, trend: "+450 this week" },
        ].map((metric) => (
          <div key={metric.label} className="flex flex-col justify-between rounded-2xl border border-black/[0.04] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
            <div className="flex items-start justify-between">
              <div className="rounded-xl bg-[#FCF8F2] p-3 text-[#D9895B]">
                <metric.icon size={20} strokeWidth={1.5} />
              </div>
              <ArrowUpRight size={16} className="text-[#8A837D]" />
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-serif text-[#3A332D]">{metric.value}</h3>
              <p className="text-sm font-medium text-[#8A837D]">{metric.label}</p>
            </div>
            <div className="mt-4 border-t border-black/[0.04] pt-4">
              <p className="text-xs font-medium text-[#3A332D]">{metric.trend}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_350px]">
        {/* Activity Feed */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl text-[#3A332D]">Recent Activity</h2>
          <div className="rounded-2xl border border-black/[0.04] bg-white shadow-sm">
            <div className="flex flex-col">
              {[
                { title: "Published a new blog post", time: "2 hours ago", icon: PenTool },
                { title: "Sent newsletter 'Design Systems'", time: "Yesterday", icon: Send },
                { title: "Added new resource 'Figma Kit'", time: "3 days ago", icon: FileText },
                { title: "Updated book 'The Calm Creator'", time: "Last week", icon: BookOpen },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-4 border-b border-black/[0.04] p-5 last:border-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FCF8F2] text-[#D9895B]">
                    <activity.icon size={16} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#3A332D]">{activity.title}</p>
                    <p className="text-xs text-[#8A837D]">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl text-[#3A332D]">Quick Actions</h2>
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
                className="group flex items-center justify-between rounded-2xl border border-black/[0.04] bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
              >
                <div className="flex items-center gap-3">
                  <action.icon size={18} className="text-[#8A837D] transition-colors group-hover:text-[#D9895B]" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-[#3A332D]">{action.label}</span>
                </div>
                <ArrowUpRight size={16} className="text-[#8A837D] opacity-0 transition-all group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
