import type { Metadata, Viewport } from 'next';
import { Archivo, JetBrains_Mono } from 'next/font/google';
import { CallsProvider } from '@/components/markets/calls-store';
import { FanProvider } from '@/components/profile/profile-store';
import { PhoneFrame } from '@/components/phone-frame';
import { BottomNav } from '@/components/ui/bottom-nav';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'FanAtlas',
  description: 'Live matches, AI commentary, and where the crowd disagrees with the model.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#08070B',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans">
        <CallsProvider>
          <FanProvider>
            <PhoneFrame>
              {children}
              <BottomNav />
            </PhoneFrame>
          </FanProvider>
        </CallsProvider>
      </body>
    </html>
  );
}
