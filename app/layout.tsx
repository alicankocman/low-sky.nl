import type { ReactNode } from 'react';

/** Root passthrough; real document lives in `[locale]/layout.tsx`. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
