export function formatCurrency(amount: number): string {
  return `Rp ${new Intl.NumberFormat("id-ID").format(amount)}`;
}

export function formatCompactCurrency(amount: number): string {
  const abs = Math.abs(amount);

  if (abs >= 1_000_000) {
    return `Rp ${(amount / 1_000_000).toFixed(1)}M`;
  }

  if (abs >= 1_000) {
    return `Rp ${(amount / 1_000).toFixed(1)}K`;
  }

  return `Rp ${amount}`;
}
