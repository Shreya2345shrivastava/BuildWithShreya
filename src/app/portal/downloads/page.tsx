import { FileText, Download } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Order from "@/lib/models/Order";
import { connectDB } from "@/lib/mongodb";

export default async function DownloadsPage() {
  const session = await getServerSession();
  if (!session?.user?.email) redirect("/sign-in");

  await connectDB();
  const downloads = await Order.find({
    customerEmail: session.user.email.toLowerCase(),
    status: "completed",
  }).sort({ createdAt: -1 }).lean();

  return (
    <div className="max-w-4xl animate-in fade-in duration-700">
      <div className="mb-10">
        <h1 className="font-serif text-3xl sm:text-4xl text-[var(--color-text-primary)] mb-4">Your Downloads</h1>
        <p className="text-lg text-[var(--color-text-secondary)]">
          Download your files to read offline. We recommend the PDF for tablets and computers, and the Workbook for printing.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {downloads.map((item) => (
          <div key={String(item._id)} className="flex flex-col justify-between rounded-2xl bg-[var(--color-surface-elevated)] p-6 shadow-sm border border-black/[0.04]">
            <div className="mb-6">
              <div className="mb-4 inline-flex rounded-xl bg-[var(--color-bg-ivory)] p-3 text-[var(--color-accent-peach)]">
                <FileText size={24} strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 font-serif text-2xl text-[var(--color-text-primary)]">Your purchased ebook</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">The complete ebook formatted beautifully for tablets and computers.</p>
            </div>
            
            <div className="flex items-center justify-between border-t border-black/[0.04] pt-4">
              <span className="text-xs font-medium uppercase tracking-widest text-[var(--color-text-secondary)]">
                PDF download
              </span>
              <a
                href={`/api/download?token=${encodeURIComponent(item.downloadToken)}&format=pdf`}
                download
                className="flex items-center gap-2 rounded-full bg-[var(--color-bg-ivory)] px-4 py-2 text-sm font-medium text-[var(--color-accent-peach)] transition-colors hover:bg-[var(--color-accent-peach)] hover:text-white"
              >
                <Download size={16} />
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
