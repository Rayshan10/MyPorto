"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/theme-toggle";

const navLinks = [
  { href: "#hero", id: "hero", label: "Home" },
  { href: "#tentang", id: "tentang", label: "About" },
  { href: "#proyek", id: "proyek", label: "Projects" },
  { href: "#pengalaman", id: "pengalaman", label: "Experience" },
  { href: "#kontak", id: "kontak", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const ids = navLinks.map((link) => link.id);

    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      let current = "hero";
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= 160) {
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
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-20 items-center justify-between gap-6 lg:h-24">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-4"
          onClick={() => setOpen(false)}
          aria-label="Rayshan Gani Putra — beranda"
        >
          <span className="font-display text-[2rem] font-extrabold leading-none tracking-[-0.1em] text-foreground">
            RG
          </span>
          <span className="hidden h-7 w-px bg-border sm:block" aria-hidden />
          <span className="hidden text-base font-semibold tracking-tight text-foreground sm:block">
            Rayshan Gani Putra
          </span>
        </Link>

        <nav
          className="hidden lg:absolute lg:left-1/2 lg:flex lg:-translate-x-1/2 items-center gap-9"
          aria-label="Navigasi utama"
        >
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 text-[0.95rem] transition-colors duration-200",
                  isActive
                    ? "text-foreground"
                    : "text-foreground/60 hover:text-foreground",
                )}
              >
                {link.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-0 -bottom-2 h-0.5 origin-left bg-brand transition-transform duration-300",
                    isActive ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="grid size-10 place-items-center rounded-lg border border-border/80 text-foreground lg:hidden"
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
          "border-t border-border bg-background lg:hidden",
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
              className={cn(
                "border-b border-border/60 px-1 py-3.5 text-sm last:border-b-0",
                active === link.id
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
