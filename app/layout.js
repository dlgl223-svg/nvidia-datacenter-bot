import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata = {
  title: 'Project APEX — RTX 4090 × Ryzen 9 9950X3D Build Showcase',
  description:
    'An interactive showcase of a high-end PC build: live-style pricing, animated part explainers, an exploded 3D view, full specs, and a build tracker.',
};

export const viewport = {
  themeColor: '#06070d',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>
        <div className="aurora" />
        <div className="grid-overlay" />
        <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      </body>
    </html>
  );
}
