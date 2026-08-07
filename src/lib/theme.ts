import { COLORS } from "@/constants/colors";
import { RADIUS } from "@/constants/radius";
import { SHADOWS } from "@/constants/shadows";
import { SITE } from "@/constants/site";
import { SPACING } from "@/constants/spacing";
import { TYPOGRAPHY } from "@/constants/typography";

export const theme = {
  site: SITE,
  colors: COLORS,
  typography: TYPOGRAPHY,
  spacing: SPACING,
  radius: RADIUS,
  shadows: SHADOWS,
  containers: {
    mobile: "100%",
    tablet: "46rem",
    laptop: "64rem",
    desktop: "78rem",
    wide: "88rem",
    ultraWide: "96rem",
  },
  motion: {
    fast: "160ms ease",
    base: "220ms ease",
    slow: "320ms ease",
  },
} as const;

export const semanticTheme = {
  background: COLORS.background.ivory,
  surface: COLORS.surface.primary,
  text: COLORS.text.primary,
  border: COLORS.border.soft,
  accent: COLORS.accent.peach,
} as const;

export const buttonTheme = {
  primary: {
    background: COLORS.text.primary,
    foreground: COLORS.text.inverse,
    border: COLORS.text.primary,
    hoverBackground: COLORS.accent.gold,
    focusRing: COLORS.state.focus,
  },
  secondary: {
    background: COLORS.surface.secondary,
    foreground: COLORS.text.primary,
    border: COLORS.border.soft,
  },
  outline: {
    background: "transparent",
    foreground: COLORS.text.primary,
    border: COLORS.border.strong,
  },
  ghost: {
    background: "transparent",
    foreground: COLORS.text.primary,
    border: "transparent",
  },
  disabled: {
    background: COLORS.border.subtle,
    foreground: COLORS.text.muted,
    border: COLORS.border.soft,
  },
} as const;

export const cardTheme = {
  base: {
    background: COLORS.surface.elevated,
    border: COLORS.border.subtle,
    shadow: SHADOWS.card,
    radius: RADIUS.xl,
  },
  book: {
    background: COLORS.surface.primary,
    border: COLORS.border.soft,
    shadow: SHADOWS.soft,
    radius: RADIUS.xl,
  },
  feature: {
    background: COLORS.surface.secondary,
    border: COLORS.border.subtle,
    shadow: SHADOWS.soft,
    radius: RADIUS.lg,
  },
  newsletter: {
    background: COLORS.background.peachTint,
    border: COLORS.border.soft,
    shadow: SHADOWS.md,
    radius: RADIUS.xl,
  },
  testimonial: {
    background: COLORS.surface.primary,
    border: COLORS.border.soft,
    shadow: SHADOWS.md,
    radius: RADIUS.xl,
  },
  blog: {
    background: COLORS.surface.elevated,
    border: COLORS.border.subtle,
    shadow: SHADOWS.soft,
    radius: RADIUS.lg,
  },
} as const;

export const formTheme = {
  input: {
    background: COLORS.surface.elevated,
    border: COLORS.border.soft,
    text: COLORS.text.primary,
    placeholder: COLORS.text.muted,
    focusRing: COLORS.state.focus,
    error: COLORS.state.error,
    disabled: COLORS.border.subtle,
  },
  textarea: {
    background: COLORS.surface.elevated,
    border: COLORS.border.soft,
    text: COLORS.text.primary,
    placeholder: COLORS.text.muted,
    focusRing: COLORS.state.focus,
  },
  checkbox: {
    background: COLORS.surface.elevated,
    border: COLORS.border.strong,
    checked: COLORS.text.primary,
    focusRing: COLORS.state.focus,
  },
} as const;