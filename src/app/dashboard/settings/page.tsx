"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  User, Bell, Shield, Palette, Loader2, ImagePlus, AlertCircle
} from "lucide-react";
import { 
  SettingsSection, SettingsInput, SettingsTextarea, SettingsToggle 
} from "@/components/ui/settings/SettingsComponents";
import { 
  getUserSettings, updateProfile, updateBranding, updateNotifications, deleteAccount 
} from "@/lib/actions/settings.actions";

// --- Schemas ---
const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters")
    .regex(/^[a-z0-9_]+$/, "Only lowercase letters, numbers, and underscores allowed"),
  bio: z.string().max(200, "Bio cannot exceed 200 characters").optional().or(z.literal("")),
  image: z.string().optional().or(z.literal("")),
});

const brandingSchema = z.object({
  brandName: z.string().optional().or(z.literal("")),
  brandDescription: z.string().max(300, "Description cannot exceed 300 characters").optional().or(z.literal("")),
  website: z.string().optional().or(z.literal("")),
  twitter: z.string().optional().or(z.literal("")),
  linkedin: z.string().optional().or(z.literal("")),
  brandLogo: z.string().optional().or(z.literal("")),
  colorPrimary: z.string().optional(),
  colorAccent: z.string().optional(),
});

const notificationsSchema = z.object({
  newSubscriberAlerts: z.boolean(),
  newsletterSignupAlerts: z.boolean(),
  newBookPurchaseAlerts: z.boolean(),
  blogCommentAlerts: z.boolean(),
  weeklySummaryEmail: z.boolean(),
});

type Tab = "profile" | "account" | "branding" | "notifications";

export default function SettingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  
  const currentTab = (searchParams.get("tab") as Tab) || "profile";
  
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState("");

  // States for save feedback
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [toastMsg, setToastMsg] = useState("");

  // Forms
  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "", username: "", bio: "", image: "" }
  });

  const brandingForm = useForm<z.infer<typeof brandingSchema>>({
    resolver: zodResolver(brandingSchema),
    defaultValues: { brandName: "", brandDescription: "", website: "", twitter: "", linkedin: "", brandLogo: "", colorPrimary: "#201913", colorAccent: "#d9a48f" }
  });

  const notifForm = useForm<z.infer<typeof notificationsSchema>>({
    resolver: zodResolver(notificationsSchema),
    defaultValues: { newSubscriberAlerts: true, newsletterSignupAlerts: true, newBookPurchaseAlerts: true, blogCommentAlerts: true, weeklySummaryEmail: false }
  });

  // Fetch initial data
  useEffect(() => {
    async function loadData() {
      try {
        const user = await getUserSettings();
        profileForm.reset({
          name: user.name || "",
          username: user.username || "",
          bio: user.bio || "",
          image: user.image || "",
        });
        brandingForm.reset({
          brandName: user.brandName || "",
          brandDescription: user.brandDescription || "",
          website: user.website || "",
          twitter: user.twitter || "",
          linkedin: user.linkedin || "",
          brandLogo: user.brandLogo || "",
          colorPrimary: user.colorPrimary || "#201913",
          colorAccent: user.colorAccent || "#d9a48f",
        });
        notifForm.reset({
          newSubscriberAlerts: user.newSubscriberAlerts ?? true,
          newsletterSignupAlerts: user.newsletterSignupAlerts ?? true,
          newBookPurchaseAlerts: user.newBookPurchaseAlerts ?? true,
          blogCommentAlerts: user.blogCommentAlerts ?? true,
          weeklySummaryEmail: user.weeklySummaryEmail ?? false,
        });
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [profileForm, brandingForm, notifForm]);

  const changeTab = (tab: Tab) => {
    // Unsaved changes check could go here if we tracked form.formState.isDirty globally
    const params = new URLSearchParams(searchParams);
    params.set("tab", tab);
    router.replace(`/dashboard/settings?${params.toString()}`);
  };

  const showToast = (type: "saved" | "error", msg: string) => {
    setSaveStatus(type);
    setToastMsg(msg);
    setTimeout(() => {
      setSaveStatus("idle");
      setToastMsg("");
    }, 3000);
  };

  const onProfileSubmit = async (data: z.infer<typeof profileSchema>) => {
    setSaveStatus("saving");
    const res = await updateProfile(data);
    if (res.success) {
      profileForm.reset(data);
      showToast("saved", "Profile updated successfully");
    } else {
      showToast("error", res.error || "Failed to save profile");
    }
  };

  const onBrandingSubmit = async (data: z.infer<typeof brandingSchema>) => {
    setSaveStatus("saving");
    const res = await updateBranding(data);
    if (res.success) {
      brandingForm.reset(data);
      showToast("saved", "Branding updated successfully");
    } else {
      showToast("error", res.error || "Failed to update branding");
    }
  };

  const handleNotifToggle = async (key: keyof z.infer<typeof notificationsSchema>, checked: boolean) => {
    notifForm.setValue(key, checked);
    const data = notifForm.getValues();
    const res = await updateNotifications(data);
    if (!res.success) {
      // Revert if failed
      notifForm.setValue(key, !checked);
      showToast("error", "Failed to update preferences");
    } else {
      showToast("saved", "Preferences updated");
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        brandingForm.setValue("brandLogo", reader.result as string, { shouldDirty: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        profileForm.setValue("image", reader.result as string, { shouldDirty: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== "DELETE") return;
    const res = await deleteAccount();
    if (res.success) {
      signOut({ callbackUrl: "/" });
    } else {
      showToast("error", "Failed to delete account");
    }
  };

  const renderSaveButton = (disabled: boolean) => (
    <button 
      type="submit"
      disabled={disabled || saveStatus === "saving"}
      className={`flex items-center justify-center min-w-[140px] rounded-full px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all ${
        saveStatus === "saved" 
          ? "bg-green-600 hover:bg-green-700" 
          : saveStatus === "error"
          ? "bg-red-600 hover:bg-red-700"
          : "bg-[#3A332D] hover:bg-[#D9895B] hover:shadow-md disabled:opacity-50 disabled:hover:bg-[#3A332D]"
      }`}
    >
      {saveStatus === "saving" ? (
        <><Loader2 size={16} className="animate-spin mr-2" /> Saving...</>
      ) : saveStatus === "saved" ? (
        "✓ " + toastMsg
      ) : saveStatus === "error" ? (
        "✕ " + toastMsg
      ) : (
        "Save Changes"
      )}
    </button>
  );

  const profileImageWatch = profileForm.watch("image");
  const brandLogoWatch = brandingForm.watch("brandLogo");
  const notif1 = notifForm.watch("newSubscriberAlerts");
  const notif2 = notifForm.watch("newsletterSignupAlerts");
  const notif3 = notifForm.watch("newBookPurchaseAlerts");
  const notif4 = notifForm.watch("blogCommentAlerts");
  const notif5 = notifForm.watch("weeklySummaryEmail");

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div>
        <h1 className="font-serif text-4xl text-[#3A332D]">Settings</h1>
        <p className="mt-2 text-lg text-[#8A837D]">Manage your account, preferences, and brand.</p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[250px_1fr]">
        {/* Navigation */}
        <nav className="flex flex-col space-y-1">
          {[
            { id: "profile", label: "Profile", icon: User },
            { id: "account", label: "Account", icon: Shield },
            { id: "branding", label: "Branding", icon: Palette },
            { id: "notifications", label: "Notifications", icon: Bell },
          ].map((item) => {
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => changeTab(item.id as Tab)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  active 
                    ? "bg-white text-[#3A332D] shadow-sm border border-black/[0.04]" 
                    : "text-[#8A837D] hover:bg-black/[0.02] hover:text-[#3A332D]"
                }`}
              >
                <item.icon size={18} strokeWidth={1.5} className={active ? "text-[#D9895B]" : ""} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Content */}
        <div className="space-y-8">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-[#D9895B]">
              <Loader2 size={32} className="animate-spin" />
            </div>
          ) : (
            <>
              {/* --- PROFILE TAB --- */}
              {currentTab === "profile" && (
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
                  <SettingsSection
                    title="Public Profile"
                    description="This is how others will see you on the platform."
                    footer={renderSaveButton(!profileForm.formState.isDirty)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-black/[0.04] pb-8">
                      <div className="flex items-center gap-6">
                        {profileImageWatch ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img 
                            src={profileImageWatch} 
                            alt="Profile Avatar" 
                            className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-full border border-black/[0.04] object-cover shadow-sm"
                          />
                        ) : (
                          <div className="flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-full border border-dashed border-[#D9895B]/30 bg-[#FCF8F2] text-[#D9895B]">
                            <User size={24} />
                          </div>
                        )}
                        <div>
                          <label className="cursor-pointer inline-block rounded-full border border-black/[0.04] bg-white px-4 py-2 text-sm font-medium text-[#3A332D] shadow-sm transition-all hover:bg-black/[0.02]">
                            Upload Avatar
                            <input type="file" accept="image/*" className="hidden" onChange={handleProfileImageUpload} />
                          </label>
                          {profileImageWatch && (
                            <button 
                              type="button"
                              onClick={() => profileForm.setValue("image", "", { shouldDirty: true })}
                              className="ml-3 text-sm font-medium text-red-500 hover:text-red-600"
                            >
                              Remove
                            </button>
                          )}
                          <p className="mt-3 text-xs text-[#8A837D]">Stored securely in database. 1MB max recommended.</p>
                        </div>
                      </div>
                      
                      {/* View Public Profile Link */}
                      {profileForm.watch("username") && (
                         <a 
                           href={`/author/${profileForm.watch("username")}`}
                           target="_blank"
                           rel="noreferrer"
                           className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#FCF8F2] px-5 py-2.5 text-sm font-medium text-[#D9895B] border border-[#D9895B]/20 transition-all hover:bg-[#F5E7DB]"
                         >
                           View Public Profile ↗
                         </a>
                      )}
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 pt-2">
                      <SettingsInput 
                        label="Display Name" 
                        {...profileForm.register("name")}
                        error={profileForm.formState.errors.name?.message}
                      />
                      <SettingsInput 
                        label="Username" 
                        prefixUrl="buildwithshreya.com/"
                        {...profileForm.register("username")}
                        error={profileForm.formState.errors.username?.message}
                      />
                    </div>
                    <SettingsTextarea 
                      label="Bio" 
                      rows={4}
                      {...profileForm.register("bio")}
                      error={profileForm.formState.errors.bio?.message}
                    />
                  </SettingsSection>
                </form>
              )}

              {/* --- ACCOUNT TAB --- */}
              {currentTab === "account" && (
                <div className="space-y-8">
                  <SettingsSection
                    title="Authentication"
                    description="Manage how you sign in to your account."
                  >
                    {/* Assuming Google OAuth by default since next-auth uses it */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-black/[0.04] p-4 bg-[#FCF8F2]/50">
                      <div>
                        <p className="text-sm font-medium text-[#3A332D]">Email Address</p>
                        <p className="text-sm text-[#8A837D]">{session?.user?.email}</p>
                        <p className="mt-2 text-xs font-medium text-green-600 bg-green-50 inline-block px-2 py-0.5 rounded-full border border-green-200">
                          Managed by Google
                        </p>
                      </div>
                      <a 
                        href="https://myaccount.google.com" 
                        target="_blank" 
                        rel="noreferrer"
                        className="rounded-full border border-black/[0.04] bg-white px-4 py-2 text-sm font-medium text-[#3A332D] shadow-sm transition-all hover:bg-black/[0.02] text-center"
                      >
                        Manage Google Account
                      </a>
                    </div>
                  </SettingsSection>

                  <section className="rounded-2xl border border-red-100 bg-white shadow-sm overflow-hidden">
                    <div className="border-b border-red-100 bg-red-50/50 p-6 sm:p-8">
                      <h2 className="font-serif text-2xl text-red-600 flex items-center gap-2">
                        <AlertCircle size={20} /> Danger Zone
                      </h2>
                      <p className="mt-1 text-sm text-red-500/80">Irreversibly delete your account and all data.</p>
                    </div>
                    <div className="p-6 sm:p-8 space-y-4">
                      <p className="text-sm text-[#3A332D]">Type <strong>DELETE</strong> below to confirm.</p>
                      <input 
                        type="text" 
                        value={deleteConfirm}
                        onChange={(e) => setDeleteConfirm(e.target.value)}
                        className="w-full max-w-sm rounded-xl border border-red-200 bg-white px-4 py-2 text-sm text-red-600 outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400"
                      />
                      <div className="mt-4">
                        <button 
                          type="button"
                          disabled={deleteConfirm !== "DELETE"}
                          onClick={handleDeleteAccount}
                          className="rounded-full bg-red-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-red-700 disabled:opacity-50"
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {/* --- BRANDING TAB --- */}
              {currentTab === "branding" && (
                <form onSubmit={brandingForm.handleSubmit(onBrandingSubmit)}>
                  <SettingsSection
                    title="Brand Assets"
                    description="Configure your digital storefront's appearance."
                    footer={renderSaveButton(!brandingForm.formState.isDirty)}
                  >
                    <div className="flex items-start gap-6 border-b border-black/[0.04] pb-8">
                      {brandLogoWatch ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img 
                          src={brandLogoWatch} 
                          alt="Brand Logo" 
                          className="h-24 w-24 rounded-2xl border border-black/[0.04] object-cover shadow-sm"
                        />
                      ) : (
                        <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-dashed border-[#D9895B]/30 bg-[#FCF8F2] text-[#D9895B]">
                          <ImagePlus size={24} />
                        </div>
                      )}
                      <div>
                        <label className="cursor-pointer rounded-full border border-black/[0.04] bg-white px-4 py-2 text-sm font-medium text-[#3A332D] shadow-sm transition-all hover:bg-black/[0.02]">
                          Upload Logo
                          <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                        </label>
                        {brandLogoWatch && (
                          <button 
                            type="button"
                            onClick={() => brandingForm.setValue("brandLogo", "", { shouldDirty: true })}
                            className="ml-3 text-sm font-medium text-red-500 hover:text-red-600"
                          >
                            Remove
                          </button>
                        )}
                        <p className="mt-3 text-xs text-[#8A837D]">Stored securely as base64 in database. 1MB max recommended.</p>
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 pt-2">
                      <SettingsInput 
                        label="Brand Name" 
                        {...brandingForm.register("brandName")}
                        error={brandingForm.formState.errors.brandName?.message}
                      />
                      <SettingsInput 
                        label="Website" 
                        prefixUrl="https://"
                        {...brandingForm.register("website")}
                        error={brandingForm.formState.errors.website?.message}
                      />
                    </div>
                    <SettingsTextarea 
                      label="Brand Description" 
                      rows={3}
                      {...brandingForm.register("brandDescription")}
                      error={brandingForm.formState.errors.brandDescription?.message}
                    />

                    <div className="grid gap-6 sm:grid-cols-2">
                      <SettingsInput 
                        label="Twitter URL" 
                        {...brandingForm.register("twitter")}
                        error={brandingForm.formState.errors.twitter?.message}
                      />
                      <SettingsInput 
                        label="LinkedIn URL" 
                        {...brandingForm.register("linkedin")}
                        error={brandingForm.formState.errors.linkedin?.message}
                      />
                    </div>
                    
                    <div className="grid gap-6 sm:grid-cols-2 pt-4 border-t border-black/[0.04]">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#3A332D]">Primary Color</label>
                        <div className="flex items-center gap-3">
                          <input type="color" {...brandingForm.register("colorPrimary")} className="h-10 w-10 cursor-pointer rounded border-0 p-0" />
                          <span className="text-sm text-[#8A837D]">{brandingForm.watch("colorPrimary")}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#3A332D]">Accent Color</label>
                        <div className="flex items-center gap-3">
                          <input type="color" {...brandingForm.register("colorAccent")} className="h-10 w-10 cursor-pointer rounded border-0 p-0" />
                          <span className="text-sm text-[#8A837D]">{brandingForm.watch("colorAccent")}</span>
                        </div>
                      </div>
                    </div>
                  </SettingsSection>
                </form>
              )}

              {/* --- NOTIFICATIONS TAB --- */}
              {currentTab === "notifications" && (
                <SettingsSection
                  title="Notification Preferences"
                  description="Manage when and how we contact you. Saves automatically."
                >
                  <div className="space-y-6">
                    <SettingsToggle 
                      label="New Subscriber Alerts" 
                      description="Get notified when someone follows your public profile."
                      checked={notif1}
                      onChange={(c) => handleNotifToggle("newSubscriberAlerts", c)}
                    />
                    <div className="h-px bg-black/[0.04]" />
                    <SettingsToggle 
                      label="Newsletter Signup Alerts" 
                      description="Get notified when someone joins your newsletter."
                      checked={notif2}
                      onChange={(c) => handleNotifToggle("newsletterSignupAlerts", c)}
                    />
                    <div className="h-px bg-black/[0.04]" />
                    <SettingsToggle 
                      label="New Book Purchase Alerts" 
                      description="Get notified when you sell a digital book."
                      checked={notif3}
                      onChange={(c) => handleNotifToggle("newBookPurchaseAlerts", c)}
                    />
                    <div className="h-px bg-black/[0.04]" />
                    <SettingsToggle 
                      label="Blog Comment Alerts" 
                      description="Get notified when someone comments on your blogs."
                      checked={notif4}
                      onChange={(c) => handleNotifToggle("blogCommentAlerts", c)}
                    />
                    <div className="h-px bg-black/[0.04]" />
                    <SettingsToggle 
                      label="Weekly Summary Email" 
                      description="Receive a weekly digest of your performance."
                      checked={notif5}
                      onChange={(c) => handleNotifToggle("weeklySummaryEmail", c)}
                    />
                  </div>
                </SettingsSection>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
