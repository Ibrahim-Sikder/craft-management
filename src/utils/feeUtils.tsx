export const fmt = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount ?? 0);

export const fmtClass = (cls: string) =>
  cls.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export const pct = (num: number, den: number) =>
  den === 0 ? "0.0%" : `${((num / den) * 100).toFixed(1)}%`;
