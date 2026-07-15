import type { Account } from "../types/home.type";

export const accounts: Account[] = [
  {
    id: "bca",
    emoji: "\u{1F3E6}",
    iconBg: "rgba(16,185,129,0.16)",
    name: "BCA Tabungan",
    balance: "Rp 184.2M",
  },
  {
    id: "gopay",
    emoji: "\u{1F4F1}",
    iconBg: "rgba(14,165,233,0.14)",
    name: "GoPay",
    balance: "Rp 1.2M",
  },
  {
    id: "cash",
    emoji: "\u{1F4B5}",
    iconBg: "rgba(251,191,36,0.18)",
    name: "Cash",
    balance: "Rp 850K",
  },
  {
    id: "mandiri",
    emoji: "\u{1F3DB}️",
    iconBg: "rgba(139,92,246,0.14)",
    name: "Mandiri Giro",
    balance: "Rp 42.0M",
  },
];

export const categoryChips = [
  "Makanan",
  "Transport",
  "Tagihan",
  "Belanja",
  "Hiburan",
];
