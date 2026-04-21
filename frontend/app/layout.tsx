import "./globals.css";

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SocietyOS Starter",
  description: "Starter frontend for a Mygate-like startup",
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/resident/dashboard", label: "Resident" },
  { href: "/guard/dashboard", label: "Guard" },
  { href: "/admin/dashboard", label: "Admin" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-slate-200/80 bg-white/70 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-xl font-bold tracking-wide text-brand-ink">
              SocietyOS
            </Link>
            <div className="flex gap-4 text-sm font-semibold text-slate-700">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-brand-teal">
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
