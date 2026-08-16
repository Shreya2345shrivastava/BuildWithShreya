"use client";

import { useState, useTransition, useEffect } from "react";
import { Send, Users, TrendingUp, MoreHorizontal, X, Plus, Play, Archive, Copy, Trash2, Eye, Search, Check, Edit2 } from "lucide-react";
import { createCampaign, updateCampaign, deleteCampaign, duplicateCampaign, sendCampaign, addSubscriber, deleteSubscriber } from "@/lib/actions/newsletter.actions";
import { useRouter } from "next/navigation";

export type Subscriber = {
  _id: string;
  email: string;
  name?: string;
  status: string;
  subscribedAt: string;
};

export type Campaign = {
  _id: string;
  subject: string;
  previewText: string;
  content: string;
  coverImage?: string;
  ctaText?: string;
  ctaUrl?: string;
  status: "Draft" | "Scheduled" | "Sent";
  recipients: number;
  opens: number;
  clicks: number;
  sentAt?: string;
  createdAt: string;
};

export default function NewsletterClient({ 
  metrics, 
  initialCampaigns, 
  initialSubscribers 
}: { 
  metrics: { totalSubscribers: number, avgOpenRate: string, emailsSent: number },
  initialCampaigns: Campaign[],
  initialSubscribers: Subscriber[]
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  // Modals state
  const [modalType, setModalType] = useState<"CREATE_CAMPAIGN" | "EDIT_CAMPAIGN" | "VIEW_ALL_SUBS" | "ADD_SUB" | "DELETE_CAMPAIGN" | "ANALYTICS" | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  
  // Forms
  const [campaignForm, setCampaignForm] = useState({
    subject: "",
    previewText: "",
    content: "",
    coverImage: "",
    ctaText: "",
    ctaUrl: "",
    status: "Draft" as "Draft" | "Sent"
  });

  const [subForm, setSubForm] = useState({ email: "", name: "" });
  const [subSearch, setSubSearch] = useState("");

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const handleClick = () => setShowDropdown(null);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const openCampaignModal = (type: "CREATE_CAMPAIGN" | "EDIT_CAMPAIGN", camp?: Campaign) => {
    setModalType(type);
    if (camp) {
      setSelectedCampaign(camp);
      setCampaignForm({
        subject: camp.subject,
        previewText: camp.previewText,
        content: camp.content,
        coverImage: camp.coverImage || "",
        ctaText: camp.ctaText || "",
        ctaUrl: camp.ctaUrl || "",
        status: camp.status as "Draft" | "Sent"
      });
    } else {
      setSelectedCampaign(null);
      setCampaignForm({ subject: "", previewText: "", content: "", coverImage: "", ctaText: "", ctaUrl: "", status: "Draft" });
    }
  };

  const handleSaveCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      if (modalType === "CREATE_CAMPAIGN") {
        const res = await createCampaign(campaignForm);
        if (res.success) {
          showToast("Campaign saved as draft!");
          setModalType(null);
        } else showToast(res.error || "Error", "error");
      } else if (modalType === "EDIT_CAMPAIGN" && selectedCampaign) {
        const res = await updateCampaign(selectedCampaign._id, campaignForm);
        if (res.success) {
          showToast("Campaign updated!");
          setModalType(null);
        } else showToast(res.error || "Error", "error");
      }
    });
  };

  const handleSendCampaign = async (id: string) => {
    startTransition(async () => {
      const res = await sendCampaign(id);
      if (res.success) showToast("Campaign sent successfully!");
      else showToast(res.error || "Error", "error");
    });
  };

  const handleDeleteCampaign = async () => {
    if (!selectedCampaign) return;
    startTransition(async () => {
      const res = await deleteCampaign(selectedCampaign._id);
      if (res.success) {
        showToast("Campaign deleted");
        setModalType(null);
      } else showToast(res.error || "Error", "error");
    });
  };

  const handleAddSubscriber = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await addSubscriber(subForm);
      if (res.success) {
        showToast("Subscriber added!");
        setModalType(null);
        setSubForm({ email: "", name: "" });
      } else showToast(res.error || "Error", "error");
    });
  };

  const filteredSubs = initialSubscribers.filter(sub => 
    sub.email.toLowerCase().includes(subSearch.toLowerCase()) || 
    (sub.name && sub.name.toLowerCase().includes(subSearch.toLowerCase()))
  );

  return (
    <div className="space-y-12">
      {toast && (
        <div className={`fixed bottom-4 right-4 z-[110] flex items-center gap-2 rounded-lg px-4 py-3 shadow-lg ${toast.type === 'success' ? 'bg-[var(--color-bg-ivory)] dark:bg-[#131715] text-[var(--color-text-primary)] border border-black/[0.04]' : 'bg-red-50 text-red-800'}`}>
          {toast.type === 'success' && <Check size={16} className="text-green-600" />}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-4xl text-[var(--color-text-primary)]">Newsletter</h1>
          <p className="mt-2 text-lg text-[var(--color-text-secondary)]">Grow your audience and send campaigns.</p>
        </div>
        <button 
          onClick={() => openCampaignModal("CREATE_CAMPAIGN")}
          className="flex items-center gap-2 rounded-full bg-[#3A332D] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[var(--color-accent-peach)] hover:shadow-md"
        >
          <Send size={16} />
          Create Campaign
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {[
          { label: "Total Subscribers", value: metrics.totalSubscribers.toLocaleString(), icon: Users, trend: "Active readers", positive: true },
          { label: "Avg Open Rate", value: metrics.avgOpenRate, icon: TrendingUp, trend: "Across sent campaigns", positive: true },
          { label: "Emails Sent", value: metrics.emailsSent.toLocaleString(), icon: Send, trend: "Lifetime total", positive: true },
        ].map((metric) => (
          <div key={metric.label} className="flex flex-col justify-between rounded-2xl border border-black/[0.04] bg-[var(--color-surface-elevated)] dark:bg-[#242b28] p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="rounded-xl bg-[var(--color-bg-ivory)] dark:bg-[#131715] p-3 text-[var(--color-accent-peach)]">
                <metric.icon size={20} strokeWidth={1.5} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-serif text-[var(--color-text-primary)]">{metric.value}</h3>
              <p className="text-sm font-medium text-[var(--color-text-secondary)]">{metric.label}</p>
            </div>
            <div className="mt-4 border-t border-black/[0.04] pt-4">
              <p className={`text-xs font-medium text-[var(--color-text-secondary)]`}>{metric.trend}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_350px]">
        {/* Recent Campaigns */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl text-[var(--color-text-primary)]">Recent Campaigns</h2>
          <div className="overflow-hidden rounded-2xl border border-black/[0.04] bg-[var(--color-surface-elevated)] dark:bg-[#242b28] shadow-sm">
            <div className="overflow-x-auto min-h-[300px]">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-black/[0.04] bg-[var(--color-bg-ivory)] dark:bg-[#131715] text-[var(--color-text-secondary)]">
                  <tr>
                    <th className="px-6 py-4 font-medium">Subject</th>
                    <th className="px-6 py-4 font-medium">Sent On</th>
                    <th className="px-6 py-4 font-medium">Open Rate</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04]">
                  {initialCampaigns.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center">
                         <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-bg-ivory)] dark:bg-[#131715] text-[var(--color-accent-peach)]">
                            <Send size={24} />
                          </div>
                          <p className="text-[var(--color-text-primary)] font-medium">No campaigns yet</p>
                          <p className="text-[var(--color-text-secondary)] text-sm mt-1">Create your first newsletter to get started.</p>
                      </td>
                    </tr>
                  ) : initialCampaigns.map((camp) => (
                    <tr key={camp._id} className="transition-colors hover:bg-black/[0.02]">
                      <td className="px-6 py-4 font-medium text-[var(--color-text-primary)]">
                        <div className="flex flex-col">
                          <span>{camp.subject}</span>
                          <span className={`text-xs mt-1 font-semibold ${camp.status === 'Sent' ? 'text-green-600' : 'text-amber-500'}`}>{camp.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[var(--color-text-secondary)]">{camp.sentAt ? new Date(camp.sentAt).toLocaleDateString() : '-'}</td>
                      <td className="px-6 py-4 text-[var(--color-text-primary)]">{camp.recipients > 0 ? ((camp.opens / camp.recipients) * 100).toFixed(1) + '%' : '-'}</td>
                      <td className="px-6 py-4 text-right relative">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setShowDropdown(showDropdown === camp._id ? null : camp._id); }}
                          className="text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] p-2"
                        >
                          <MoreHorizontal size={18} />
                        </button>
                        {/* DROPDOWN */}
                        {showDropdown === camp._id && (
                          <div className="absolute right-8 top-10 z-10 w-48 rounded-xl border border-black/[0.04] bg-[var(--color-surface-elevated)] dark:bg-[#242b28] py-1 shadow-lg flex flex-col text-left">
                            {camp.status === "Sent" ? (
                              <button onClick={() => { setSelectedCampaign(camp); setModalType("ANALYTICS"); }} className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-black/[0.02]"><TrendingUp size={14} /> Analytics</button>
                            ) : (
                              <>
                                <button onClick={() => openCampaignModal("EDIT_CAMPAIGN", camp)} className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-black/[0.02]"><Edit2 size={14} /> Edit Draft</button>
                                <button onClick={() => handleSendCampaign(camp._id)} className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-accent-peach)] font-medium hover:bg-black/[0.02]"><Play size={14} /> Send Now</button>
                              </>
                            )}
                            <button onClick={() => { startTransition(async () => { await duplicateCampaign(camp._id); showToast("Duplicated"); }) }} className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-black/[0.02]"><Copy size={14} /> Duplicate</button>
                            <hr className="my-1 border-black/[0.04]" />
                            <button onClick={() => { setSelectedCampaign(camp); setModalType("DELETE_CAMPAIGN"); }} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"><Trash2 size={14} /> Delete</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Subscribers */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl text-[var(--color-text-primary)]">New Readers</h2>
            <button onClick={() => setModalType("VIEW_ALL_SUBS")} className="text-sm font-medium text-[var(--color-accent-peach)] transition-colors hover:text-[var(--color-text-primary)]">
              View All
            </button>
          </div>
          <div className="rounded-2xl border border-black/[0.04] bg-[var(--color-surface-elevated)] dark:bg-[#242b28] shadow-sm">
            <div className="flex flex-col">
              {initialSubscribers.slice(0, 5).map((sub) => (
                <div key={sub._id} className="flex items-center justify-between border-b border-black/[0.04] p-5 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-bg-ivory)] dark:bg-[#131715] text-xs font-medium text-[var(--color-accent-peach)]">
                      {sub.name ? sub.name.charAt(0).toUpperCase() : sub.email.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      {sub.name && <p className="truncate text-sm font-medium text-[var(--color-text-primary)] max-w-[150px]">{sub.name}</p>}
                      <p className="truncate text-xs text-[var(--color-text-secondary)] max-w-[150px]">{sub.email}</p>
                    </div>
                  </div>
                </div>
              ))}
              {initialSubscribers.length === 0 && (
                <div className="p-5 text-center text-sm text-[var(--color-text-secondary)]">No subscribers yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODALS */}
      {modalType && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm">
          <div className={`w-full ${modalType === 'CREATE_CAMPAIGN' || modalType === 'EDIT_CAMPAIGN' || modalType === 'VIEW_ALL_SUBS' ? 'max-w-4xl' : 'max-w-md'} overflow-hidden rounded-3xl bg-[var(--color-surface-elevated)] dark:bg-[#242b28] shadow-2xl flex flex-col max-h-[90vh]`}>
            
            {/* CAMPAIGN EDITOR */}
            {(modalType === "CREATE_CAMPAIGN" || modalType === "EDIT_CAMPAIGN") && (
              <form className="flex flex-col h-full min-h-0 overflow-hidden" onSubmit={handleSaveCampaign}>
                <div className="flex items-center justify-between border-b border-black/[0.04] px-6 py-4 flex-shrink-0 bg-[var(--color-bg-ivory)] dark:bg-[#131715]">
                  <h3 className="font-serif text-xl text-[var(--color-text-primary)]">{modalType === "CREATE_CAMPAIGN" ? "Create Campaign" : "Edit Campaign"}</h3>
                  <button type="button" onClick={() => setModalType(null)} className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"><X size={20} /></button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 bg-[var(--color-surface-elevated)] dark:bg-[#242b28]">
                  <div className="max-w-3xl mx-auto space-y-6">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">Subject Line</label>
                      <input required type="text" value={campaignForm.subject} onChange={e => setCampaignForm({...campaignForm, subject: e.target.value})} className="w-full rounded-xl border border-black/[0.04] bg-[var(--color-bg-ivory)] dark:bg-[#131715] px-4 py-3 text-lg font-serif outline-none focus:border-[#D9895B] focus:bg-[var(--color-surface-elevated)] dark:bg-[#242b28] focus:ring-1 focus:ring-[#D9895B]" placeholder="A new chapter awaits..." />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">Preview Text</label>
                      <input required type="text" value={campaignForm.previewText} onChange={e => setCampaignForm({...campaignForm, previewText: e.target.value})} className="w-full rounded-xl border border-black/[0.04] bg-[var(--color-bg-ivory)] dark:bg-[#131715] px-4 py-3 text-sm outline-none focus:border-[#D9895B] focus:bg-[var(--color-surface-elevated)] dark:bg-[#242b28] focus:ring-1 focus:ring-[#D9895B]" placeholder="Here is a sneak peek..." />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">Email Content (Markdown/Text)</label>
                      <textarea required value={campaignForm.content} onChange={e => setCampaignForm({...campaignForm, content: e.target.value})} rows={10} className="w-full rounded-xl border border-black/[0.04] bg-[var(--color-bg-ivory)] dark:bg-[#131715] px-4 py-4 text-sm outline-none focus:border-[#D9895B] focus:bg-[var(--color-surface-elevated)] dark:bg-[#242b28] focus:ring-1 focus:ring-[#D9895B] font-mono leading-relaxed" placeholder="Write your email here..."></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">CTA Button Text</label>
                        <input type="text" value={campaignForm.ctaText} onChange={e => setCampaignForm({...campaignForm, ctaText: e.target.value})} className="w-full rounded-xl border border-black/[0.04] bg-[var(--color-bg-ivory)] dark:bg-[#131715] px-4 py-3 text-sm outline-none focus:border-[#D9895B] focus:bg-[var(--color-surface-elevated)] dark:bg-[#242b28] focus:ring-1 focus:ring-[#D9895B]" placeholder="Read More" />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">CTA URL</label>
                        <input type="url" value={campaignForm.ctaUrl} onChange={e => setCampaignForm({...campaignForm, ctaUrl: e.target.value})} className="w-full rounded-xl border border-black/[0.04] bg-[var(--color-bg-ivory)] dark:bg-[#131715] px-4 py-3 text-sm outline-none focus:border-[#D9895B] focus:bg-[var(--color-surface-elevated)] dark:bg-[#242b28] focus:ring-1 focus:ring-[#D9895B]" placeholder="https://..." />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-black/[0.04] bg-[var(--color-bg-ivory)] dark:bg-[#131715] px-6 py-4 flex-shrink-0">
                  <button type="button" onClick={() => setModalType(null)} className="rounded-full border border-black/[0.04] bg-[var(--color-surface-elevated)] dark:bg-[#242b28] px-6 py-2.5 text-sm font-medium text-[var(--color-text-primary)] hover:bg-black/[0.02]">Cancel</button>
                  <button type="submit" disabled={isPending} className="rounded-full bg-[#3A332D] px-6 py-2.5 text-sm font-medium text-white hover:bg-[var(--color-accent-peach)] disabled:opacity-50">
                    {isPending ? "Saving..." : "Save Draft"}
                  </button>
                </div>
              </form>
            )}

            {/* VIEW ALL SUBSCRIBERS MODAL */}
            {modalType === "VIEW_ALL_SUBS" && (
              <div className="flex flex-col h-full min-h-0 overflow-hidden">
                <div className="flex items-center justify-between border-b border-black/[0.04] px-6 py-4 flex-shrink-0">
                  <h3 className="font-serif text-xl text-[var(--color-text-primary)]">All Subscribers ({initialSubscribers.length})</h3>
                  <button onClick={() => setModalType(null)} className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"><X size={20} /></button>
                </div>
                <div className="p-4 bg-[var(--color-bg-ivory)] dark:bg-[#131715] border-b border-black/[0.04] flex gap-4">
                  <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />
                    <input type="text" value={subSearch} onChange={e=>setSubSearch(e.target.value)} placeholder="Search emails..." className="w-full rounded-xl border border-black/[0.04] bg-[var(--color-surface-elevated)] dark:bg-[#242b28] py-2 pl-9 pr-4 text-sm outline-none focus:border-[#D9895B]" />
                  </div>
                  <button onClick={() => setModalType("ADD_SUB")} className="rounded-xl bg-[#3A332D] px-4 py-2 text-sm text-white hover:bg-[var(--color-accent-peach)] flex items-center gap-2"><Plus size={16}/> Add Manual</button>
                </div>
                <div className="flex-1 overflow-y-auto p-0">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-black/[0.04] sticky top-0">
                      <tr>
                        <th className="px-6 py-3 font-medium text-[var(--color-text-secondary)]">Email</th>
                        <th className="px-6 py-3 font-medium text-[var(--color-text-secondary)]">Joined</th>
                        <th className="px-6 py-3 font-medium text-[var(--color-text-secondary)] text-right">Remove</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.04]">
                      {filteredSubs.map(sub => (
                        <tr key={sub._id} className="hover:bg-black/[0.02]">
                          <td className="px-6 py-3">
                            <span className="font-medium text-[var(--color-text-primary)]">{sub.email}</span>
                            {sub.name && <span className="block text-xs text-[var(--color-text-secondary)]">{sub.name}</span>}
                          </td>
                          <td className="px-6 py-3 text-[var(--color-text-secondary)]">{new Date(sub.subscribedAt).toLocaleDateString()}</td>
                          <td className="px-6 py-3 text-right">
                            <button onClick={() => { startTransition(async () => { await deleteSubscriber(sub._id); showToast("Removed"); }) }} className="text-red-500 hover:text-red-700"><Trash2 size={16}/></button>
                          </td>
                        </tr>
                      ))}
                      {filteredSubs.length === 0 && (
                        <tr><td colSpan={3} className="px-6 py-8 text-center text-[var(--color-text-secondary)]">No subscribers match your search.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ADD SUBSCRIBER */}
            {modalType === "ADD_SUB" && (
              <form onSubmit={handleAddSubscriber}>
                <div className="flex items-center justify-between border-b border-black/[0.04] px-6 py-4">
                  <h3 className="font-serif text-xl text-[var(--color-text-primary)]">Add Subscriber</h3>
                  <button type="button" onClick={() => setModalType("VIEW_ALL_SUBS")} className="text-[var(--color-text-secondary)]"><X size={20} /></button>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">Email Address</label>
                    <input required type="email" value={subForm.email} onChange={e => setSubForm({...subForm, email: e.target.value})} className="w-full rounded-xl border border-black/[0.04] bg-[var(--color-bg-ivory)] dark:bg-[#131715] px-4 py-3 text-sm outline-none focus:border-[#D9895B]" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">Name (Optional)</label>
                    <input type="text" value={subForm.name} onChange={e => setSubForm({...subForm, name: e.target.value})} className="w-full rounded-xl border border-black/[0.04] bg-[var(--color-bg-ivory)] dark:bg-[#131715] px-4 py-3 text-sm outline-none focus:border-[#D9895B]" />
                  </div>
                </div>
                <div className="flex gap-4 border-t border-black/[0.04] bg-[var(--color-bg-ivory)] dark:bg-[#131715] px-6 py-4">
                  <button type="button" onClick={() => setModalType("VIEW_ALL_SUBS")} className="flex-1 rounded-full bg-[var(--color-surface-elevated)] dark:bg-[#242b28] px-4 py-3 text-sm font-medium text-[var(--color-text-primary)] border border-black/[0.04]">Cancel</button>
                  <button type="submit" disabled={isPending} className="flex-1 rounded-full bg-[#3A332D] px-4 py-3 text-sm font-medium text-white hover:bg-[var(--color-accent-peach)] disabled:opacity-50">Add</button>
                </div>
              </form>
            )}

            {/* DELETE CAMPAIGN */}
            {modalType === "DELETE_CAMPAIGN" && selectedCampaign && (
              <div className="p-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600"><Trash2 size={24} /></div>
                <h3 className="mb-2 font-serif text-2xl text-[var(--color-text-primary)]">Delete Campaign?</h3>
                <p className="mb-8 text-[var(--color-text-secondary)]">Are you sure you want to delete "{selectedCampaign.subject}"?</p>
                <div className="flex gap-4">
                  <button onClick={() => setModalType(null)} className="flex-1 rounded-full border border-black/[0.04] bg-[var(--color-bg-ivory)] dark:bg-[#131715] px-4 py-3 text-sm font-medium text-[var(--color-text-primary)]">Cancel</button>
                  <button onClick={handleDeleteCampaign} className="flex-1 rounded-full bg-red-600 px-4 py-3 text-sm font-medium text-white" disabled={isPending}>{isPending ? "Deleting..." : "Delete"}</button>
                </div>
              </div>
            )}

            {/* ANALYTICS MODAL */}
            {modalType === "ANALYTICS" && selectedCampaign && (
              <div className="p-8 text-center">
                <h3 className="mb-2 font-serif text-2xl text-[var(--color-text-primary)]">Campaign Analytics</h3>
                <p className="mb-6 text-[var(--color-text-secondary)]">{selectedCampaign.subject}</p>
                <div className="grid grid-cols-2 gap-4 text-left">
                   <div className="bg-[var(--color-bg-ivory)] dark:bg-[#131715] p-4 rounded-xl">
                      <p className="text-sm text-[var(--color-text-secondary)] mb-1">Delivered</p>
                      <p className="text-2xl font-serif text-[var(--color-text-primary)]">{selectedCampaign.recipients}</p>
                   </div>
                   <div className="bg-[var(--color-bg-ivory)] dark:bg-[#131715] p-4 rounded-xl">
                      <p className="text-sm text-[var(--color-text-secondary)] mb-1">Total Opens</p>
                      <p className="text-2xl font-serif text-[var(--color-text-primary)]">{selectedCampaign.opens}</p>
                   </div>
                   <div className="bg-[var(--color-bg-ivory)] dark:bg-[#131715] p-4 rounded-xl">
                      <p className="text-sm text-[var(--color-text-secondary)] mb-1">Open Rate</p>
                      <p className="text-2xl font-serif text-[var(--color-text-primary)]">{selectedCampaign.recipients > 0 ? ((selectedCampaign.opens / selectedCampaign.recipients) * 100).toFixed(1) : 0}%</p>
                   </div>
                   <div className="bg-[var(--color-bg-ivory)] dark:bg-[#131715] p-4 rounded-xl">
                      <p className="text-sm text-[var(--color-text-secondary)] mb-1">Click Rate</p>
                      <p className="text-2xl font-serif text-[var(--color-text-primary)]">{selectedCampaign.recipients > 0 ? ((selectedCampaign.clicks / selectedCampaign.recipients) * 100).toFixed(1) : 0}%</p>
                   </div>
                </div>
                <button onClick={() => setModalType(null)} className="mt-8 w-full rounded-full border border-black/[0.04] bg-[var(--color-surface-elevated)] dark:bg-[#242b28] px-4 py-3 text-sm font-medium text-[var(--color-text-primary)]">Close Analytics</button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
