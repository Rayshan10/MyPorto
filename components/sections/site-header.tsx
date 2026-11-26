"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#tentang", label: "Tentang", index: "01" },
  { href: "#pengalaman", label: "Pengalaman", index: "02" },
  { href: "#proyek", label: "Proyek", index: "03" },
  { href: "#keahlian", label: "Keahlian", index: "04" },
  { href: "#kontak", label: "Kontak", index: "06" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container-page flex h-14 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="grid size-8 place-items-center bg-foreground font-mono text-[0.65rem] font-semibold tracking-wider text-background">
            RG
          </span>
          <span className="hidden text-sm font-medium tracking-tight sm:block">
            Rayshan Gani Putra
          </span>
        </Link>

        <nav
          className="hidden items-center gap-6 md:flex"
          aria-label="Navigasi utama"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link-underline font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#kontak"
            className="hidden h-8 items-center bg-primary px-3.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-foreground/80 sm:inline-flex"
          >
            Hubungi Saya
          </a>
          <button
            type="button"
            className="grid size-8 place-items-center border border-border text-foreground md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Tutup menu" : "Buka menu"}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-border bg-background md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav
          className="container-page flex flex-col py-2"
          aria-label="Navigasi seluler"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-border/60 px-1 py-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground last:border-b-0 hover:text-foreground"
            >
              {link.label}
              <span className="text-[0.6rem]">{link.index}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
