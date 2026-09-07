"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

// ─── Global Types ─────────────────────────────────────────────────────────────

export type Category = "personal_celebration" | "personal_brand" | "business" | "custom_experiences" | "";
export type ProjectType =
  | "birthday"
  | "anniversary"
  | "wedding"
  | "baby"
  | "family"
  | "memorial"
  | "portfolio"
  | "creator"
  | "author"
  | "artist"
  | "speaker"
  | "business_site"
  | "landing_page"
  | "store"
  | "agency"
  | "custom_story"
  | "";

export type DesignStyle = "luxury" | "editorial" | "minimal" | "elegant" | "modern" | "romantic" | "bold" | "creative" | "";
export type ColorMood = "warm_beige" | "champagne" | "soft_pink" | "dark_luxury" | "forest_green" | "cream" | "custom" | "";
export type AnimationLevel = "minimal" | "balanced" | "premium" | "luxury" | "";

// ─── Specific Feature Types ───────────────────────────────────────────────────

export interface BirthdayDetails {
  personName: string;
  age: string;
  date: string;
  favoriteColors: string;
  theme: string;
  gallerySize: "none" | "10" | "25" | "50" | "100";
  videoCount: "none" | "1-3" | "4-10" | "unlimited";
  music: boolean;
  messagesCount: "none" | "5" | "10" | "20" | "unlimited";
  memoryTimeline: boolean;
  countdown: boolean;
  surpriseReveal: boolean;
}

export interface PortfolioDetails {
  profession: string;
  skills: string;
  experience: string;
  projectCount: "none" | "3" | "5" | "10" | "20";
  hasBlog: boolean;
  hasBooking: boolean;
  hasServices: boolean;
}

export interface BusinessDetails {
  businessName: string;
  industry: string;
  services: string;
  targetAudience: string;
  competitors: string;
  hasLeadForms: boolean;
  hasCRM: boolean;
  hasWhatsApp: boolean;
  hasEcommerce: boolean;
}

export interface CustomStoryDetails {
  purpose: string;
  recipientName: string;
  relationship: string;
  story: string;
  feelings: string[];
  qualityLevel: "essential" | "premium" | "luxury" | "signature" | "";
  contentUploads: {
    photos: boolean;
    videos: boolean;
    audio: boolean;
    messages: boolean;
    letters: boolean;
    screenshots: boolean;
    voiceNotes: boolean;
    links: boolean;
    documents: boolean;
  };
  extraNotes: string;
}

// ─── Main Form State ──────────────────────────────────────────────────────────

export interface ConfiguratorData {
  category: Category;
  projectType: ProjectType;
  
  // Design Studio
  designStyle: DesignStyle;
  colorMood: ColorMood;
  animationLevel: AnimationLevel;

  // Specifics
  birthday: BirthdayDetails;
  portfolio: PortfolioDetails;
  business: BusinessDetails;
  customStory: CustomStoryDetails;

  // Global Config
  rushDelivery: boolean;
  name: string;
  email: string;
}

interface OrderContextValue {
  step: number;
  totalSteps: number;
  form: ConfiguratorData;
  setStep: (s: number) => void;
  updateForm: (patch: Partial<ConfiguratorData>) => void;
  updateBirthday: (patch: Partial<BirthdayDetails>) => void;
  updatePortfolio: (patch: Partial<PortfolioDetails>) => void;
  updateBusiness: (patch: Partial<BusinessDetails>) => void;
  updateCustomStory: (patch: Partial<CustomStoryDetails>) => void;
  estimatedPrice: number;
  estimatedDays: number;
  pricingMode: "exact" | "estimate";
}

const defaultForm: ConfiguratorData = {
  category: "",
  projectType: "",
  designStyle: "",
  colorMood: "",
  animationLevel: "",
  birthday: {
    personName: "",
    age: "",
    date: "",
    favoriteColors: "",
    theme: "",
    gallerySize: "none",
    videoCount: "none",
    music: false,
    messagesCount: "none",
    memoryTimeline: false,
    countdown: false,
    surpriseReveal: false,
  },
  portfolio: {
    profession: "",
    skills: "",
    experience: "",
    projectCount: "none",
    hasBlog: false,
    hasBooking: false,
    hasServices: false,
  },
  business: {
    businessName: "",
    industry: "",
    services: "",
    targetAudience: "",
    competitors: "",
    hasLeadForms: false,
    hasCRM: false,
    hasWhatsApp: false,
    hasEcommerce: false,
  },
  customStory: {
    purpose: "",
    recipientName: "",
    relationship: "",
    story: "",
    feelings: [],
    qualityLevel: "",
    contentUploads: {
      photos: false, videos: false, audio: false, messages: false, letters: false,
      screenshots: false, voiceNotes: false, links: false, documents: false
    },
    extraNotes: "",
  },
  rushDelivery: false,
  name: "",
  email: "",
};

// ─── Smart Pricing Logic ──────────────────────────────────────────────────────

function calculatePrice(form: ConfiguratorData): { price: number; days: number; pricingMode: "exact" | "estimate" } {
  let price = 0;
  let days = 14; // Base timeline
  let pricingMode: "exact" | "estimate" = "exact";

  if (form.projectType === "custom_story") {
    pricingMode = "estimate";
    // Dummy base estimate for custom story
    price = 2999;
    days = 14;
    return { price, days, pricingMode };
  }

  // Base Packages
  if (form.category === "personal_celebration" && form.projectType) { price += 2999; days = 7; }
  if (form.category === "personal_brand" && form.projectType) { price += 4999; days = 14; }
  if (form.category === "business" && form.projectType) { price += 8999; days = 21; }

  if (!form.projectType) return { price: 0, days: 0, pricingMode: "exact" };

  // Birthday Add-ons
  if (form.projectType === "birthday") {
    if (form.birthday.gallerySize === "25") price += 500;
    if (form.birthday.gallerySize === "50") price += 1000;
    if (form.birthday.gallerySize === "100") price += 2000;
    
    if (form.birthday.videoCount === "1-3") price += 800;
    if (form.birthday.videoCount === "4-10") price += 1500;
    if (form.birthday.videoCount === "unlimited") price += 2500;

    if (form.birthday.music) price += 300;
    
    if (form.birthday.messagesCount === "10") price += 400;
    if (form.birthday.messagesCount === "20") price += 800;
    if (form.birthday.messagesCount === "unlimited") price += 1500;

    if (form.birthday.memoryTimeline) price += 700;
    if (form.birthday.countdown) price += 200;
    if (form.birthday.surpriseReveal) price += 600;
  }

  // Portfolio Add-ons
  if (form.projectType === "portfolio") {
    if (form.portfolio.projectCount === "3") price += 1500;
    if (form.portfolio.projectCount === "5") price += 2500;
    if (form.portfolio.projectCount === "10") price += 4000;
    if (form.portfolio.projectCount === "20") price += 7000;
    
    if (form.portfolio.hasBlog) price += 2000;
    if (form.portfolio.hasBooking) price += 1500;
    if (form.portfolio.hasServices) price += 1000;
  }

  // Business Add-ons
  if (form.projectType === "business_site") {
    if (form.business.hasLeadForms) price += 1500;
    if (form.business.hasCRM) price += 3500;
    if (form.business.hasWhatsApp) price += 800;
    if (form.business.hasEcommerce) price += 8500;
  }

  // Animations Complexity Fee
  if (form.animationLevel === "premium") price += 1500;
  if (form.animationLevel === "luxury") price += 3000;

  // Rush Fee
  if (form.rushDelivery) {
    price += 2500;
    days = Math.max(3, Math.floor(days / 2));
  }

  return { price, days, pricingMode };
}

// ─── Context Provider ─────────────────────────────────────────────────────────

const OrderCtx = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ConfiguratorData>(defaultForm);

  function updateForm(patch: Partial<ConfiguratorData>) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  function updateBirthday(patch: Partial<BirthdayDetails>) {
    setForm((prev) => ({ ...prev, birthday: { ...prev.birthday, ...patch } }));
  }

  function updatePortfolio(patch: Partial<PortfolioDetails>) {
    setForm((prev) => ({ ...prev, portfolio: { ...prev.portfolio, ...patch } }));
  }

  function updateBusiness(patch: Partial<BusinessDetails>) {
    setForm((prev) => ({ ...prev, business: { ...prev.business, ...patch } }));
  }

  function updateCustomStory(patch: Partial<CustomStoryDetails>) {
    setForm((prev) => ({ ...prev, customStory: { ...prev.customStory, ...patch } }));
  }

  const { price, days, pricingMode } = calculatePrice(form);

  return (
    <OrderCtx.Provider
      value={{
        step,
        totalSteps: form.projectType === "custom_story" ? 9 : 5, 
        form,
        setStep,
        updateForm,
        updateBirthday,
        updatePortfolio,
        updateBusiness,
        updateCustomStory,
        estimatedPrice: price,
        estimatedDays: days,
        pricingMode,
      }}
    >
      {children}
    </OrderCtx.Provider>
  );
}

export function useOrder(): OrderContextValue {
  const ctx = useContext(OrderCtx);
  if (!ctx) throw new Error("useOrder must be used inside <OrderProvider>");
  return ctx;
}
