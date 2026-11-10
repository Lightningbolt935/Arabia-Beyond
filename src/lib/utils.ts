import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency: string = 'GBP'): string {
  const currencySymbols: Record<string, string> = {
    GBP: '£',
    USD: '$',
    EUR: '€',
    AED: 'AED ',
    SAR: 'SAR '
  };

  const exchangeRates: Record<string, number> = {
    GBP: 1,
    USD: 1.28,
    EUR: 1.18,
    AED: 4.70,
    SAR: 4.80
  };

  const rate = exchangeRates[currency] || 1;
  const converted = Math.round(amount * rate);
  const symbol = currencySymbols[currency] || `${currency} `;

  return `${symbol}${converted.toLocaleString('en-GB')}`;
}

export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}

