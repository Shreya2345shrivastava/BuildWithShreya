import React from "react";
import { getGlobalBrandSettings } from "@/lib/actions/settings.actions";

export async function BrandProvider({ children }: { children: React.ReactNode }) {
  const brandSettings = await getGlobalBrandSettings();
  
  // If brandSettings exist, inject inline variables to override globals.css
  const customStyles = brandSettings ? `
    :root {
      ${brandSettings.colorPrimary ? `--color-text-primary: ${brandSettings.colorPrimary};` : ""}
      ${brandSettings.colorAccent ? `--color-accent-peach: ${brandSettings.colorAccent};` : ""}
    }
  ` : "";

  return (
    <>
      {customStyles && <style dangerouslySetInnerHTML={{ __html: customStyles }} />}
      {children}
    </>
  );
}
