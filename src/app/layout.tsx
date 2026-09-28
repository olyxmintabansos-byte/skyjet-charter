import type { Metadata } from 'next';
import './globals.css';
import { AviationProvider } from '@/context/AviationContext';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'SkyJet Charter — Private Jet Operations & Aerodynamic Aviation Fleet',
  description:
    'Titan #42: Luxury private aviation operations console, Gulfstream G700 and Bombardier Global 7500 fleet telemetry, Jet A-1 fuel estimator, and empty-leg flash bookings.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-[#0c0d10] text-[#e2e8f0]">
        <AviationProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
        </AviationProvider>
      </body>
    </html>
  );
}
