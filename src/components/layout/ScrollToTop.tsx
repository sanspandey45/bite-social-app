'use client';

// to reset new page because Next.js is preserving scroll positions between pages
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);  // runs every time the route changes
  
  return null;
}