"use client";

import { useState, useTransition, useEffect } from "react";
import { Search, Plus, MoreHorizontal, Filter, Download, FileText, Image as ImageIcon, Eye, Edit2, Copy, Trash2, X, Check } from "lucide-react";
import { createResource, updateResource, deleteResource, duplicateResource, incrementDownloads } from "@/lib/actions/resources.actions";
import { useRouter, useSearchParams } from "next/navigation";

// Types
export type Resource = {
  _id: string;
  title: string;
  description: string;
  category: string;
  fileUrl: string;
  thumbnailUrl?: string;
  downloads: number;
  status: "Draft" | "Published";
  createdAt: string;
  updatedAt: string;
};

const CATEGORIES = ["All Categories", "Design", "Code", "Productivity", "Tools", "Templates", "Marketing", "Business"];

export default function ResourceClient({ initialResources }: { initialResources: Resource[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const resources = initialResources;
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All Categories");
  
  // Modals state
  const [modalType, setModalType] = useState<"CREATE" | "EDIT" | "VIEW" | "DELETE" | null>(null);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [showDropdown, setShowDropdown] = useState<string | null>(null); // Resource ID
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Design",
    fileUrl: "",
    thumbnailUrl: "",
    status: "Draft" as "Draft" | "Published",
  });

  // Toasts
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Debounced Search & Filter URL Update
  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchQuery) params.set("query", searchQuery);
      else params.delete("query");
      
      if (category !== "All Categories") params.set("category", category);
      else params.delete("category");
      
      router.push(`/dashboard/resources?${params.toString()}`);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery, category, router, searchParams]);

  // Sync resources when prop changes (from server action revalidate)
  // Removed local state to rely on Server Component re-renders

  // Click outside to close dropdown
  useEffect(() => {
    const handleClick = () => setShowDropdown(null);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleOpenModal = (type: "CREATE" | "EDIT" | "VIEW" | "DELETE", resource?: Resource) => {
    setModalType(type);
    if (resource) {
      setSelectedResource(resource);
      if (type === "EDIT") {
        setFormData({
          title: resource.title,
          description: resource.description,
          category: resource.category,
          fileUrl: resource.fileUrl,
          thumbnailUrl: resource.thumbnailUrl || "",
          status: resource.status,
        });
      }
    } else {
      setFormData({
        title: "",
        description: "",
        category: "Design",
        fileUrl: "",
        thumbnailUrl: "",
        status: "Draft",
      });
      setSelectedResource(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      if (modalType === "CREATE") {
        const res = await createResource(formData);
        if (res.success) {
          showToast("Resource created successfully");
          setModalType(null);
        } else {
          showToast(res.error || "Error", "error");
        }
      } else if (modalType === "EDIT" && selectedResource) {
        const res = await updateResource(selectedResource._id, formData);
        if (res.success) {
          showToast("Resource updated successfully");
          setModalType(null);
        } else {
          showToast(res.error || "Error", "error");
        }
      }
    });
  };

  const handleDelete = async () => {
    if (!selectedResource) return;
    startTransition(async () => {
      const res = await deleteResource(selectedResource._id);
      if (res.success) {
        showToast("Resource deleted successfully");
        setModalType(null);
      } else {
        showToast(res.error || "Error", "error");
      }
    });
  };

  const handleDuplicate = async (id: string) => {
    startTransition(async () => {
      const res = await duplicateResource(id);
      if (res.success) showToast("Resource duplicated");
      else showToast(res.error || "Error", "error");
    });
  };

  const handleToggleStatus = async (resource: Resource) => {
    startTransition(async () => {
      const newStatus = resource.status === "Published" ? "Draft" : "Published";
      const res = await updateResource(resource._id, { status: newStatus });
      if (res.success) showToast(`Resource ${newStatus.toLowerCase()}`);
      else showToast(res.error || "Error", "error");
    });
  };

  const handleDownload = async (resource: Resource) => {
    // Open in new tab
    window.open(resource.fileUrl, "_blank");
    // Increment downloads quietly
    await incrementDownloads(resource._id);
  };

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
          <h1 className="font-serif text-4xl text-[var(--color-text-primary)]">Resources</h1>
          <p className="mt-2 text-lg text-[var(--color-text-secondary)]">Manage your downloadable assets and tools.</p>
        </div>
        <button 
          onClick={() => handleOpenModal("CREATE")}
          className="flex items-center gap-2 rounded-full bg-[#3A332D] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[var(--color-accent-peach)] hover:shadow-md"
        >
          <Plus size={16} />
          Create Resource
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="relative w-full max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Search size={18} className="text-[var(--color-text-secondary)]" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-black/[0.04] bg-[var(--color-surface-elevated)] dark:bg-[#242b28] py-2.5 pl-11 pr-4 text-sm text-[var(--color-text-primary)] placeholder-[#8A837D] shadow-sm outline-none transition-all focus:border-[#D9895B] focus:ring-1 focus:ring-[#D9895B]"
            placeholder="Search resources..."
          />
        </div>
        <div className="relative w-full sm:w-auto">
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex w-full appearance-none items-center justify-center gap-2 rounded-full border border-black/[0.04] bg-[var(--color-surface-elevated)] dark:bg-[#242b28] px-5 py-2.5 pl-10 pr-8 text-sm font-medium text-[var(--color-text-primary)] shadow-sm outline-none transition-all hover:bg-black/[0.02] sm:w-auto"
          >
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Filter size={16} className="text-[var(--color-text-secondary)]" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-black/[0.04] bg-[var(--color-surface-elevated)] dark:bg-[#242b28] shadow-sm">
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-black/[0.04] bg-[var(--color-bg-ivory)] dark:bg-[#131715] text-[var(--color-text-secondary)]">
              <tr>
                <th className="px-6 py-4 font-medium">Resource Name</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Downloads</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04]">
              {isPending ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[var(--color-text-secondary)]">Loading...</td>
                </tr>
              ) : resources.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[var(--color-text-secondary)]">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FileText size={32} className="opacity-20" />
                      <p>No resources found.</p>
                      <button onClick={() => handleOpenModal("CREATE")} className="mt-2 text-sm text-[var(--color-accent-peach)] hover:underline">Create your first resource</button>
                    </div>
                  </td>
                </tr>
              ) : resources.map((res) => (
                <tr key={res._id} className="transition-colors hover:bg-black/[0.02]">
                  <td className="px-6 py-4 font-medium text-[var(--color-text-primary)]">
                    <div className="flex items-center gap-3">
                      {res.thumbnailUrl ? (
                        <div className="h-10 w-10 overflow-hidden rounded bg-gray-100 flex-shrink-0">
                          <img src={res.thumbnailUrl} alt={res.title} className="h-full w-full object-cover" />
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded bg-[var(--color-bg-ivory)] dark:bg-[#131715] text-[var(--color-accent-peach)]">
                          <FileText size={16} />
                        </div>
                      )}
                      <div>
                        <p>{res.title}</p>
                        <p className="text-xs font-normal text-[var(--color-text-secondary)] truncate max-w-[200px]">{res.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[var(--color-text-secondary)]">{res.category}</td>
                  <td className="px-6 py-4 text-[var(--color-text-primary)] font-medium">{res.downloads.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${res.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                      {res.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setShowDropdown(showDropdown === res._id ? null : res._id); }}
                      className="rounded p-2 text-[var(--color-text-secondary)] transition-colors hover:bg-black/[0.04] hover:text-[var(--color-text-primary)]"
                    >
                      <MoreHorizontal size={18} />
                    </button>
                    {/* DROPDOWN MENU */}
                    {showDropdown === res._id && (
                      <div className="absolute right-8 top-12 z-10 w-48 rounded-xl border border-black/[0.04] bg-[var(--color-surface-elevated)] dark:bg-[#242b28] py-1 shadow-lg flex flex-col text-left">
                        <button onClick={() => handleOpenModal("VIEW", res)} className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-black/[0.02]"><Eye size={14} /> View</button>
                        <button onClick={() => handleDownload(res)} className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-black/[0.02]"><Download size={14} /> Download File</button>
                        <button onClick={() => handleOpenModal("EDIT", res)} className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-black/[0.02]"><Edit2 size={14} /> Edit</button>
                        <button onClick={() => handleToggleStatus(res)} className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-black/[0.02]"><FileText size={14} /> {res.status === "Published" ? "Unpublish" : "Publish"}</button>
                        <button onClick={() => handleDuplicate(res._id)} className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-black/[0.02]"><Copy size={14} /> Duplicate</button>
                        <hr className="my-1 border-black/[0.04]" />
                        <button onClick={() => handleOpenModal("DELETE", res)} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"><Trash2 size={14} /> Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALS */}
      {modalType && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-[var(--color-surface-elevated)] dark:bg-[#242b28] shadow-2xl">
            {/* DELETE MODAL */}
            {modalType === "DELETE" && selectedResource && (
              <div className="p-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <Trash2 size={24} />
                </div>
                <h3 className="mb-2 font-serif text-2xl text-[var(--color-text-primary)]">Delete Resource?</h3>
                <p className="mb-8 text-[var(--color-text-secondary)]">Are you sure you want to delete &quot;{selectedResource.title}&quot;? This action cannot be undone.</p>
                <div className="flex gap-4">
                  <button onClick={() => setModalType(null)} className="flex-1 rounded-full border border-black/[0.04] bg-[var(--color-bg-ivory)] dark:bg-[#131715] px-4 py-3 text-sm font-medium text-[var(--color-text-primary)] hover:bg-black/[0.04]">Cancel</button>
                  <button onClick={handleDelete} className="flex-1 rounded-full bg-red-600 px-4 py-3 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50" disabled={isPending}>
                    {isPending ? "Deleting..." : "Delete Resource"}
                  </button>
                </div>
              </div>
            )}

            {/* VIEW MODAL */}
            {modalType === "VIEW" && selectedResource && (
              <div className="flex flex-col h-full min-h-0 overflow-hidden">
                <div className="flex items-center justify-between border-b border-black/[0.04] px-6 py-4">
                  <h3 className="font-serif text-xl text-[var(--color-text-primary)]">Resource Details</h3>
                  <button onClick={() => setModalType(null)} className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"><X size={20} /></button>
                </div>
                <div className="p-6 overflow-y-auto">
                  {selectedResource.thumbnailUrl && (
                    <img src={selectedResource.thumbnailUrl} alt="" className="mb-6 h-48 w-full rounded-xl object-cover border border-black/[0.04]" />
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-peach)]">{selectedResource.category}</span>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${selectedResource.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>{selectedResource.status}</span>
                  </div>
                  <h4 className="font-serif text-2xl text-[var(--color-text-primary)] mb-4">{selectedResource.title}</h4>
                  <p className="text-[var(--color-text-secondary)] mb-6 whitespace-pre-wrap">{selectedResource.description}</p>
                  
                  <div className="flex gap-4 text-sm text-[var(--color-text-secondary)] bg-[var(--color-bg-ivory)] dark:bg-[#131715] p-4 rounded-xl border border-black/[0.04]">
                    <div>
                      <span className="block font-medium text-[var(--color-text-primary)]">Downloads</span>
                      {selectedResource.downloads.toLocaleString()}
                    </div>
                    <div>
                      <span className="block font-medium text-[var(--color-text-primary)]">Created</span>
                      {new Date(selectedResource.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="border-t border-black/[0.04] bg-[var(--color-bg-ivory)] dark:bg-[#131715] px-6 py-4 flex gap-4">
                  <button onClick={() => handleDownload(selectedResource)} className="flex-1 rounded-full bg-[#3A332D] px-4 py-3 text-sm font-medium text-white hover:bg-[var(--color-accent-peach)] flex items-center justify-center gap-2">
                    <Download size={16} /> Open File
                  </button>
                </div>
              </div>
            )}

            {/* CREATE / EDIT MODAL */}
            {(modalType === "CREATE" || modalType === "EDIT") && (
              <form className="flex flex-col h-full min-h-0 overflow-hidden" onSubmit={handleSubmit}>
                <div className="flex items-center justify-between border-b border-black/[0.04] px-6 py-4">
                  <h3 className="font-serif text-xl text-[var(--color-text-primary)]">{modalType === "CREATE" ? "Create Resource" : "Edit Resource"}</h3>
                  <button type="button" onClick={() => setModalType(null)} className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"><X size={20} /></button>
                </div>
                <div className="p-6 space-y-4 flex-1 overflow-y-auto">
                  
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">Title</label>
                    <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full rounded-xl border border-black/[0.04] bg-[var(--color-bg-ivory)] dark:bg-[#131715] px-4 py-3 text-sm outline-none focus:border-[#D9895B] focus:bg-[var(--color-surface-elevated)] dark:bg-[#242b28] focus:ring-1 focus:ring-[#D9895B]" placeholder="E.g. Ultimate Design Kit" />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">Description</label>
                    <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="w-full rounded-xl border border-black/[0.04] bg-[var(--color-bg-ivory)] dark:bg-[#131715] px-4 py-3 text-sm outline-none focus:border-[#D9895B] focus:bg-[var(--color-surface-elevated)] dark:bg-[#242b28] focus:ring-1 focus:ring-[#D9895B]" placeholder="What is this resource about?"></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">Category</label>
                      <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full rounded-xl border border-black/[0.04] bg-[var(--color-bg-ivory)] dark:bg-[#131715] px-4 py-3 text-sm outline-none focus:border-[#D9895B] focus:bg-[var(--color-surface-elevated)] dark:bg-[#242b28] focus:ring-1 focus:ring-[#D9895B]">
                        {CATEGORIES.filter(c => c !== "All Categories").map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">Status</label>
                      <select required value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as "Draft" | "Published"})} className="w-full rounded-xl border border-black/[0.04] bg-[var(--color-bg-ivory)] dark:bg-[#131715] px-4 py-3 text-sm outline-none focus:border-[#D9895B] focus:bg-[var(--color-surface-elevated)] dark:bg-[#242b28] focus:ring-1 focus:ring-[#D9895B]">
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 flex items-center gap-2 text-sm font-medium text-[var(--color-text-primary)]"><FileText size={14}/> File URL</label>
                    <input required type="url" value={formData.fileUrl} onChange={e => setFormData({...formData, fileUrl: e.target.value})} className="w-full rounded-xl border border-black/[0.04] bg-[var(--color-bg-ivory)] dark:bg-[#131715] px-4 py-3 text-sm outline-none focus:border-[#D9895B] focus:bg-[var(--color-surface-elevated)] dark:bg-[#242b28] focus:ring-1 focus:ring-[#D9895B]" placeholder="https://..." />
                    <p className="mt-1 text-xs text-[var(--color-text-secondary)]">Link to your PDF, ZIP, or Figma file.</p>
                  </div>

                  <div>
                    <label className="mb-1 flex items-center gap-2 text-sm font-medium text-[var(--color-text-primary)]"><ImageIcon size={14}/> Thumbnail URL (Optional)</label>
                    <input type="url" value={formData.thumbnailUrl} onChange={e => setFormData({...formData, thumbnailUrl: e.target.value})} className="w-full rounded-xl border border-black/[0.04] bg-[var(--color-bg-ivory)] dark:bg-[#131715] px-4 py-3 text-sm outline-none focus:border-[#D9895B] focus:bg-[var(--color-surface-elevated)] dark:bg-[#242b28] focus:ring-1 focus:ring-[#D9895B]" placeholder="https://..." />
                  </div>

                </div>
                <div className="flex gap-4 border-t border-black/[0.04] bg-[var(--color-bg-ivory)] dark:bg-[#131715] px-6 py-4">
                  <button type="button" onClick={() => setModalType(null)} className="flex-1 rounded-full border border-black/[0.04] bg-[var(--color-surface-elevated)] dark:bg-[#242b28] px-4 py-3 text-sm font-medium text-[var(--color-text-primary)] hover:bg-black/[0.02]">Cancel</button>
                  <button type="submit" disabled={isPending} className="flex-1 rounded-full bg-[#3A332D] px-4 py-3 text-sm font-medium text-white hover:bg-[var(--color-accent-peach)] disabled:opacity-50">
                    {isPending ? "Saving..." : modalType === "CREATE" ? "Create Resource" : "Save Changes"}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
