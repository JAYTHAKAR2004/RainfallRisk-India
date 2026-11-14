export function fmtNum(value: number | null | undefined, decimals = 2): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '—';
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function fmtSigned(value: number | null | undefined, decimals = 2, unit = ''): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '—';
  const sign = value > 0 ? '+' : '';
  return `${sign}${fmtNum(value, decimals)}${unit ? ` ${unit}` : ''}`;
}

export function fmtPValue(p: number | null | undefined): string {
  if (p === null || p === undefined || Number.isNaN(p)) return '—';
  if (p === 0) return '< 1.00 × 10⁻¹⁶';
  if (p < 0.0001) {
    return p.toExponential(2);
  }
  return p.toFixed(4);
}

export function fmtInt(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '—';
  return Math.round(value).toLocaleString('en-US');
}

