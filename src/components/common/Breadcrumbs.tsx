'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center flex-wrap gap-1.5 text-xs text-white/50">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-[#C5A880] transition-colors"
            title="Arab & Beyond Home"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-white/30" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-[#DFC9AA] text-white/70 transition-colors capitalize"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#C5A880] font-medium truncate max-w-xs capitalize" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

