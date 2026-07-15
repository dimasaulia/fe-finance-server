import type { Portfolio } from "../types/home.type";

export const portfolios: Portfolio[] = [
  {
    id: "bca-tabungan",
    emoji: "\u{1F3E6}",
    iconBg: "rgba(16,185,129,0.16)",
    name: "BCA Tabungan",
    sub: "Rekening utama",
    amount: "Rp 184.2M",
    trend: "+2.1%",
    trendUp: true,
  },
  {
    id: "reksadana-saham",
    emoji: "\u{1F4C8}",
    iconBg: "rgba(14,165,233,0.14)",
    name: "Reksadana Saham",
    sub: "Bibit",
    amount: "Rp 62.5M",
    trend: "+8.4%",
    trendUp: true,
  },
  {
    id: "emas-digital",
    emoji: "\u{1FA99}",
    iconBg: "rgba(251,191,36,0.18)",
    name: "Emas Digital",
    sub: "Pegadaian",
    amount: "Rp 21.7M",
    trend: "-0.6%",
    trendUp: false,
  },
  {
    id: "piutang",
    emoji: "\u{1F9FE}",
    iconBg: "rgba(244,63,94,0.12)",
    name: "Piutang",
    sub: "3 peminjam aktif",
    amount: "Rp 9.4M",
    trend: "5 hari lagi",
    trendUp: null,
  },
];
