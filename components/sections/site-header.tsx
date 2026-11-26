"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#tentang", label: "Tentang", index: "01" },
  { href: "#pengalaman", label: "Pengalaman", index: "02" },
  { href: "#proyek", label: "Proyek", index: "03" },
  { href: "#keahlian", label: "Keahlian", index: "04" },
  { href: "#sertifikasi", label: "Sertifikasi", index: "05" },
  { href: "#kontak", label: "Kontak", index: "06" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = navLinks.map((link) => link.href.slice(1));

    const onScroll = () => {
      let current = "";
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= 140) {
          current = id;
        }
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="grid size-9 place-items-center bg-brand font-mono text-[0.7rem] font-semibold tracking-wider text-brand-foreground">
            RG
          </span>
          <span className="hidden h-6 w-px bg-border sm:block" aria-hidden />
          <span className="hidden text-sm font-medium tracking-tight sm:block">
            Rayshan Gani Putra
          </span>
        </Link>

        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Navigasi utama"
        >
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-2 text-[0.8rem] transition-colors hover:text-foreground",
                  isActive ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {link.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-0 -bottom-px h-0.5 origin-left bg-brand transition-transform duration-300",
                    isActive ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#kontak"
            className="hidden h-9 items-center gap-2 bg-brand px-4 text-[0.72rem] font-medium text-brand-foreground transition-opacity hover:opacity-85 sm:inline-flex"
          >
            Hubungi Saya
            <ArrowUpRight className="size-3.5" />
          </a>
          <button
            type="button"
            className="grid size-9 place-items-center border border-border text-foreground md:hidden"
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
