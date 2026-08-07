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
  buttons: {
    primary: {
      background: COLORS.accent.peach,
      foreground: COLORS.text.inverse,
      border: COLORS.accent.peach,
      hoverBackground: "#be6d56",
      hoverForeground: COLORS.text.inverse,
      disabledBackground: COLORS.border.subtle,
      disabledForeground: COLORS.text.muted,
    },
    secondary: {
      background: COLORS.surface.secondary,
      foreground: COLORS.text.primary,
      border: COLORS.border.soft,
      hoverBackground: COLORS.surface.primary,
      hoverForeground: COLORS.text.primary,
      disabledBackground: COLORS.border.subtle,
      disabledForeground: COLORS.text.muted,
    },
    outline: {
      background: "transparent",
      foreground: COLORS.text.primary,
      border: COLORS.border.strong,
      hoverBackground: COLORS.surface.secondary,
      hoverForeground: COLORS.text.primary,
      disabledBackground: "transparent",
      disabledForeground: COLORS.text.muted,
    },
    ghost: {
      background: "transparent",
      foreground: COLORS.text.primary,
      border: "transparent",
      hoverBackground: COLORS.surface.secondary,
      hoverForeground: COLORS.text.primary,
      disabledBackground: "transparent",
      disabledForeground: COLORS.text.muted,
    },
    text: {
      background: "transparent",
      foreground: COLORS.text.primary,
      border: "transparent",
      hoverBackground: "transparent",
      hoverForeground: COLORS.accent.peach,
      disabledBackground: "transparent",
      disabledForeground: COLORS.text.muted,
    },
  },
  badges: {
    primary: {
      background: COLORS.background.peachTint,
      foreground: COLORS.text.primary,
      border: COLORS.border.soft,
    },
    secondary: {
      background: COLORS.background.sageTint,
      foreground: COLORS.text.primary,
      border: COLORS.border.soft,
    },
    outline: {
      background: "transparent",
      foreground: COLORS.text.primary,
      border: COLORS.border.strong,
    },
  },
  cards: {
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
  },
  forms: {
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
      error: COLORS.state.error,
      disabled: COLORS.border.subtle,
    },
    checkbox: {
      background: COLORS.surface.elevated,
      border: COLORS.border.strong,
      checked: COLORS.text.primary,
      focusRing: COLORS.state.focus,
      disabled: COLORS.border.subtle,
    },
  },
  dividers: {
    simple: COLORS.border.soft,
    botanical: COLORS.botanical.fern,
    centered: COLORS.border.subtle,
    left: COLORS.border.soft,
  },
  icons: {
    background: COLORS.surface.primary,
    foreground: COLORS.text.primary,
    shadow: SHADOWS.sm,
    radius: RADIUS.full,
  },
  frames: {
    background: COLORS.surface.elevated,
    border: COLORS.border.soft,
    shadow: SHADOWS.card,
    radius: RADIUS.xl,
  },
  decorations: {
    leaf: COLORS.botanical.leaf,
    moss: COLORS.botanical.moss,
    fern: COLORS.botanical.fern,
    peach: COLORS.accent.peach,
    sage: COLORS.accent.sage,
    gold: COLORS.accent.gold,
  },
} as const;

export const semanticTheme = {
  background: COLORS.background.ivory,
  surface: COLORS.surface.primary,
  text: COLORS.text.primary,
  border: COLORS.border.soft,
  accent: COLORS.accent.peach,
} as const;