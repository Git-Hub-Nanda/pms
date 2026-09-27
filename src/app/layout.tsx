import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { AppProviders } from '@/providers/app-providers';

export const metadata: Metadata = { title: { default: 'PMS | Product Management', template: '%s | PMS' }, description: 'Secure, accessible product management for modern teams.', robots: { index: false, follow: false } };
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) { return <html lang="en"><body><AppProviders>{children}</AppProviders></body></html>; }
