"use client";

import { useState, useTransition, useEffect } from "react";
import { Search, PenTool, Star, MoreHorizontal, FileText, X, Eye, Edit2, Copy, Trash2, Check } from "lucide-react";
import { createBlog, updateBlog, deleteBlog, duplicateBlog, incrementBlogViews } from "@/lib/actions/blogs.actions";
import { useRouter, useSearchParams } from "next/navigation";

export type Blog = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  featuredImage?: string;
  category: string;
  tags?: string;
  status: "Draft" | "Published";
  views: number;
  author: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
};

const TABS = ["All Posts", "Published", "Drafts"];
const CATEGORIES = ["Design", "Code", "Productivity", "Writing", "Business", "Marketing", "Life"];

export default function BlogClient({ initialBlogs }: { initialBlogs: Blog[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const blogs = initialBlogs;
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");
  const [activeTab, setActiveTab] = useState(searchParams.get("status") || "All Posts");
  
  // Modals state
  const [modalType, setModalType] = useState<"CREATE" | "EDIT" | "VIEW" | "DELETE" | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [showDropdown, setShowDropdown] = useState<string | null>(null); // Blog ID
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    featuredImage: "",
    category: "Writing",
    tags: "",
    status: "Draft" as "Draft" | "Published",
  });

  // Toasts
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Debounced Search & Tab URL Update
  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchQuery) params.set("query", searchQuery);
      else params.delete("query");
      
      if (activeTab !== "All Posts") params.set("status", activeTab);
      else params.delete("status");
      
      router.push(`/dashboard/blogs?${params.toString()}`);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery, activeTab, router, searchParams]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClick = () => setShowDropdown(null);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleOpenModal = (type: "CREATE" | "EDIT" | "VIEW" | "DELETE", blog?: Blog) => {
    setModalType(type);
    if (blog) {
      setSelectedBlog(blog);
      if (type === "EDIT") {
        setFormData({
          title: blog.title,
          slug: blog.slug,
          description: blog.description,
          content: blog.content,
          featuredImage: blog.featuredImage || "",
          category: blog.category,
          tags: blog.tags || "",
          status: blog.status,
        });
      }
      if (type === "VIEW") {
        incrementBlogViews(blog._id); // Async but fire and forget
      }
    } else {
      setFormData({
        title: "",
        slug: "",
        description: "",
        content: "",
        featuredImage: "",
        category: "Writing",
        tags: "",
        status: "Draft",
      });
      setSelectedBlog(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent, forceStatus?: "Draft" | "Published") => {
    e.preventDefault();
    startTransition(async () => {
      const dataToSubmit = { ...formData };
      if (forceStatus) dataToSubmit.status = forceStatus;

      if (modalType === "CREATE") {
        const res = await createBlog(dataToSubmit);
        if (res.success) {
          showToast(`Blog ${forceStatus === 'Published' ? 'published' : 'saved as draft'} successfully!`);
          setModalType(null);
        } else {
          showToast(res.error || "Error", "error");
        }
      } else if (modalType === "EDIT" && selectedBlog) {
        const res = await updateBlog(selectedBlog._id, dataToSubmit);
        if (res.success) {
          showToast("Changes saved successfully!");
          setModalType(null);
        } else {
          showToast(res.error || "Error", "error");
        }
      }
    });
  };

  const handleDelete = async () => {
    if (!selectedBlog) return;
    startTransition(async () => {
      const res = await deleteBlog(selectedBlog._id);
      if (res.success) {
        showToast("Blog deleted successfully");
        setModalType(null);
      } else {
        showToast(res.error || "Error", "error");
      }
    });
  };

  const handleDuplicate = async (id: string) => {
    startTransition(async () => {
      const res = await duplicateBlog(id);
      if (res.success) showToast("Blog duplicated as draft");
      else showToast(res.error || "Error", "error");
    });
  };

  const handleToggleStatus = async (blog: Blog) => {
    startTransition(async () => {
      const newStatus = blog.status === "Published" ? "Draft" : "Published";
      const res = await updateBlog(blog._id, { status: newStatus });
      if (res.success) showToast(`Blog ${newStatus === 'Published' ? 'published' : 'unpublished'}!`);
      else showToast(res.error || "Error", "error");
    });
  };

  return (
    <div className="space-y-12">
      {toast && (
        <div className={`fixed bottom-4 right-4 z-[110] flex items-center gap-2 rounded-lg px-4 py-3 shadow-lg ${toast.type === 'success' ? 'bg-[#FCF8F2] text-[#3A332D] border border-black/[0.04]' : 'bg-red-50 text-red-800'}`}>
          {toast.type === 'success' && <Check size={16} className="text-green-600" />}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-4xl text-[#3A332D]">Blogs</h1>
          <p className="mt-2 text-lg text-[#8A837D]">Write, edit, and publish your articles.</p>
        </div>
        <button 
          onClick={() => handleOpenModal("CREATE")}
          className="flex items-center gap-2 rounded-full bg-[#3A332D] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#D9895B] hover:shadow-md"
        >
          <PenTool size={16} />
          Write Post
        </button>
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex space-x-1 rounded-full bg-white p-1 shadow-sm border border-black/[0.04] overflow-x-auto max-w-full">
          {TABS.map((tab) => {
            const count = tab === "All Posts" 
              ? "" 
              : `(${initialBlogs.filter(b => tab === "Published" ? b.status === "Published" : b.status === "Draft").length})`; // Simple count of active view (not perfect if filtered by search, but good enough for UI)
            
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  activeTab === tab ? "bg-[#FCF8F2] text-[#D9895B]" : "text-[#8A837D] hover:bg-black/[0.02]"
                }`}
              >
                {tab}
              </button>
            )
          })}
        </div>
        <div className="relative w-full max-w-xs">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Search size={18} className="text-[#8A837D]" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-black/[0.04] bg-white py-2 pl-11 pr-4 text-sm text-[#3A332D] placeholder-[#8A837D] shadow-sm outline-none transition-all focus:border-[#D9895B] focus:ring-1 focus:ring-[#D9895B]"
            placeholder="Search articles..."
          />
        </div>
      </div>

      {/* Blog List */}
      <div className="flex flex-col gap-4">
        {isPending ? (
          <div className="py-12 text-center text-[#8A837D]">Loading...</div>
        ) : blogs.length === 0 ? (
          <div className="rounded-2xl border border-black/[0.04] bg-white p-12 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FCF8F2] text-[#D9895B]">
              <PenTool size={32} />
            </div>
            <h3 className="mb-2 font-serif text-2xl text-[#3A332D]">No articles found.</h3>
            <p className="mb-6 text-[#8A837D]">You haven't published any articles matching this view yet.</p>
            <button 
              onClick={() => handleOpenModal("CREATE")}
              className="inline-flex items-center gap-2 rounded-full bg-[#3A332D] px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#D9895B]"
            >
              Create First Blog
            </button>
          </div>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="group relative flex flex-col items-start justify-between gap-4 rounded-2xl border border-black/[0.04] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] sm:flex-row sm:items-center">
              <div className="flex items-start gap-4">
                <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl overflow-hidden ${blog.featuredImage ? 'bg-gray-100' : 'bg-[#FCF8F2] text-[#D9895B]'}`}>
                  {blog.featuredImage ? (
                    <img src={blog.featuredImage} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <PenTool size={20} />
                  )}
                </div>
                <div>
                  <h3 className="font-serif text-xl text-[#3A332D] hover:text-[#D9895B] cursor-pointer" onClick={() => handleOpenModal("VIEW", blog)}>{blog.title}</h3>
                  <div className="mt-1 flex items-center gap-3 text-sm text-[#8A837D]">
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    <span className="h-1 w-1 rounded-full bg-black/20"></span>
                    <span>{blog.views.toLocaleString()} views</span>
                    <span className="h-1 w-1 rounded-full bg-black/20"></span>
                    <span className={blog.status === 'Published' ? 'text-green-600' : 'text-yellow-600'}>{blog.status}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleOpenModal("EDIT", blog)}
                  className="rounded-full border border-black/[0.04] px-4 py-2 text-sm font-medium text-[#3A332D] transition-colors hover:bg-black/[0.02]"
                >
                  Edit
                </button>
                <div className="relative">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setShowDropdown(showDropdown === blog._id ? null : blog._id); }}
                    className="rounded p-2 text-[#8A837D] transition-colors hover:bg-black/[0.04] hover:text-[#3A332D]"
                  >
                    <MoreHorizontal size={20} />
                  </button>
                  {/* DROPDOWN MENU */}
                  {showDropdown === blog._id && (
                    <div className="absolute right-0 top-12 z-10 w-48 rounded-xl border border-black/[0.04] bg-white py-1 shadow-lg flex flex-col text-left">
                      <button onClick={() => handleOpenModal("VIEW", blog)} className="flex items-center gap-2 px-4 py-2 text-sm text-[#3A332D] hover:bg-black/[0.02]"><Eye size={14} /> View Post</button>
                      <button onClick={() => handleOpenModal("EDIT", blog)} className="flex items-center gap-2 px-4 py-2 text-sm text-[#3A332D] hover:bg-black/[0.02]"><Edit2 size={14} /> Edit</button>
                      <button onClick={() => handleToggleStatus(blog)} className="flex items-center gap-2 px-4 py-2 text-sm text-[#3A332D] hover:bg-black/[0.02]"><FileText size={14} /> {blog.status === "Published" ? "Unpublish" : "Publish"}</button>
                      <button onClick={() => handleDuplicate(blog._id)} className="flex items-center gap-2 px-4 py-2 text-sm text-[#3A332D] hover:bg-black/[0.02]"><Copy size={14} /> Duplicate</button>
                      <hr className="my-1 border-black/[0.04]" />
                      <button onClick={() => handleOpenModal("DELETE", blog)} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"><Trash2 size={14} /> Delete</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODALS */}
      {modalType && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm">
          <div className={`w-full ${modalType === "VIEW" || modalType === "CREATE" || modalType === "EDIT" ? 'max-w-4xl' : 'max-w-md'} overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col max-h-[90vh]`}>
            
            {/* DELETE MODAL */}
            {modalType === "DELETE" && selectedBlog && (
              <div className="p-8 text-center overflow-y-auto">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <Trash2 size={24} />
                </div>
                <h3 className="mb-2 font-serif text-2xl text-[#3A332D]">Delete Article?</h3>
                <p className="mb-8 text-[#8A837D]">Are you sure you want to delete &quot;{selectedBlog.title}&quot;? This action cannot be undone.</p>
                <div className="flex gap-4">
                  <button onClick={() => setModalType(null)} className="flex-1 rounded-full border border-black/[0.04] bg-[#FCF8F2] px-4 py-3 text-sm font-medium text-[#3A332D] hover:bg-black/[0.04]">Cancel</button>
                  <button onClick={handleDelete} className="flex-1 rounded-full bg-red-600 px-4 py-3 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50" disabled={isPending}>
                    {isPending ? "Deleting..." : "Delete Article"}
                  </button>
                </div>
              </div>
            )}

            {/* VIEW MODAL */}
            {modalType === "VIEW" && selectedBlog && (
              <div className="flex flex-col h-full min-h-0 overflow-hidden">
                <div className="flex items-center justify-between border-b border-black/[0.04] px-6 py-4 flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${selectedBlog.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>{selectedBlog.status}</span>
                    <span className="text-sm text-[#8A837D]">{selectedBlog.views.toLocaleString()} views</span>
                  </div>
                  <div className="flex gap-2">
                     <button onClick={() => handleOpenModal("EDIT", selectedBlog)} className="rounded-full bg-[#FCF8F2] px-4 py-2 text-sm font-medium text-[#D9895B] hover:bg-black/[0.04]">Edit</button>
                     <button onClick={() => setModalType(null)} className="p-2 text-[#8A837D] hover:bg-black/[0.04] rounded-full"><X size={20} /></button>
                  </div>
                </div>
                <div className="p-8 overflow-y-auto bg-[#FCF8F2]">
                  <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-black/[0.04]">
                    {selectedBlog.featuredImage && (
                      <img src={selectedBlog.featuredImage} alt={selectedBlog.title} className="w-full h-64 object-cover rounded-xl mb-8" />
                    )}
                    <div className="mb-6 flex gap-2">
                       <span className="text-xs font-semibold uppercase tracking-wider text-[#D9895B]">{selectedBlog.category}</span>
                    </div>
                    <h1 className="font-serif text-4xl text-[#3A332D] mb-4">{selectedBlog.title}</h1>
                    <div className="flex items-center gap-3 text-sm text-[#8A837D] mb-8 pb-8 border-b border-black/[0.04]">
                      <span>{selectedBlog.author}</span>
                      <span className="h-1 w-1 rounded-full bg-black/20"></span>
                      <span>{selectedBlog.publishedAt ? new Date(selectedBlog.publishedAt).toLocaleDateString() : new Date(selectedBlog.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="prose prose-stone max-w-none">
                      {selectedBlog.content.split('\n').map((paragraph, i) => (
                        paragraph ? <p key={i} className="mb-4 text-[#3A332D] leading-relaxed">{paragraph}</p> : <br key={i}/>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CREATE / EDIT MODAL */}
            {(modalType === "CREATE" || modalType === "EDIT") && (
              <form className="flex flex-col h-full min-h-0 overflow-hidden" onSubmit={(e) => handleSubmit(e)}>
                <div className="flex items-center justify-between border-b border-black/[0.04] px-6 py-4 flex-shrink-0 bg-[#FCF8F2]">
                  <h3 className="font-serif text-xl text-[#3A332D]">{modalType === "CREATE" ? "Write Post" : "Edit Post"}</h3>
                  <button type="button" onClick={() => setModalType(null)} className="text-[#8A837D] hover:text-[#3A332D]"><X size={20} /></button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 bg-white">
                  <div className="max-w-3xl mx-auto space-y-6">
                    
                    <div>
                      <label className="mb-1 block text-sm font-medium text-[#3A332D]">Blog Title</label>
                      <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full rounded-xl border border-black/[0.04] bg-[#FCF8F2] px-4 py-3 text-lg font-serif outline-none focus:border-[#D9895B] focus:bg-white focus:ring-1 focus:ring-[#D9895B]" placeholder="The Art of Slow Productivity" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                       <div>
                        <label className="mb-1 block text-sm font-medium text-[#3A332D]">Slug (URL)</label>
                        <input type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full rounded-xl border border-black/[0.04] bg-[#FCF8F2] px-4 py-3 text-sm outline-none focus:border-[#D9895B] focus:bg-white focus:ring-1 focus:ring-[#D9895B]" placeholder="Auto-generated if left blank" />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-[#3A332D]">Category</label>
                        <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full rounded-xl border border-black/[0.04] bg-[#FCF8F2] px-4 py-3 text-sm outline-none focus:border-[#D9895B] focus:bg-white focus:ring-1 focus:ring-[#D9895B]">
                          {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-[#3A332D]">Short Description</label>
                      <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={2} className="w-full rounded-xl border border-black/[0.04] bg-[#FCF8F2] px-4 py-3 text-sm outline-none focus:border-[#D9895B] focus:bg-white focus:ring-1 focus:ring-[#D9895B]" placeholder="A brief summary for the blog card..."></textarea>
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-[#3A332D]">Content (Markdown/Text)</label>
                      <textarea required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} rows={12} className="w-full rounded-xl border border-black/[0.04] bg-[#FCF8F2] px-4 py-4 text-sm outline-none focus:border-[#D9895B] focus:bg-white focus:ring-1 focus:ring-[#D9895B] font-mono leading-relaxed" placeholder="Write your post here..."></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-[#3A332D]">Featured Image URL</label>
                        <input type="url" value={formData.featuredImage} onChange={e => setFormData({...formData, featuredImage: e.target.value})} className="w-full rounded-xl border border-black/[0.04] bg-[#FCF8F2] px-4 py-3 text-sm outline-none focus:border-[#D9895B] focus:bg-white focus:ring-1 focus:ring-[#D9895B]" placeholder="https://..." />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-[#3A332D]">Tags (comma separated)</label>
                        <input type="text" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full rounded-xl border border-black/[0.04] bg-[#FCF8F2] px-4 py-3 text-sm outline-none focus:border-[#D9895B] focus:bg-white focus:ring-1 focus:ring-[#D9895B]" placeholder="design, freelance, remote" />
                      </div>
                    </div>

                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-black/[0.04] bg-[#FCF8F2] px-6 py-4 flex-shrink-0">
                  <button type="button" onClick={() => setModalType(null)} className="rounded-full border border-black/[0.04] bg-white px-6 py-2.5 text-sm font-medium text-[#3A332D] hover:bg-black/[0.02]">Cancel</button>
                  <div className="flex gap-3">
                    <button type="button" onClick={(e) => handleSubmit(e, "Draft")} disabled={isPending} className="rounded-full border border-[#D9895B] bg-white px-6 py-2.5 text-sm font-medium text-[#D9895B] hover:bg-[#FCF8F2] disabled:opacity-50">
                      {isPending ? "Saving..." : "Save Draft"}
                    </button>
                    <button type="button" onClick={(e) => handleSubmit(e, "Published")} disabled={isPending} className="rounded-full bg-[#3A332D] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#D9895B] disabled:opacity-50">
                      {isPending ? "Publishing..." : "Publish"}
                    </button>
                  </div>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
