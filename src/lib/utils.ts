export type ClassValue = string | number | boolean | null | undefined | ClassValue[] | { [key: string]: unknown };

export function cn(...values: ClassValue[]): string {
  return values
    .flatMap((value) => {
      if (!value) {
        return [];
      }

      if (typeof value === "string" || typeof value === "number") {
        return [String(value)];
      }

      if (Array.isArray(value)) {
        return cn(...value).split(" ");
      }

      return Object.entries(value)
        .filter(([, isActive]) => Boolean(isActive))
        .map(([className]) => className);
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}