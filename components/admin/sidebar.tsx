"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Award,
  Briefcase,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  UserRound,
  Wrench,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Proyek", icon: FolderKanban },
  { href: "/admin/experiences", label: "Pengalaman", icon: Briefcase },
  { href: "/admin/skills", label: "Keahlian", icon: Wrench },
  { href: "/admin/certifications", label: "Sertifikasi", icon: Award },
  { href: "/admin/messages", label: "Pesan", icon: Mail },
  { href: "/admin/profile", label: "Profil", icon: UserRound },
];

type AdminSidebarProps = {
  email: string;
};

export function AdminSidebar({ email }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  const nav = (
    <nav className="flex flex-col gap-1">
      {links.map((link) => {
        const Icon = link.icon;
        const active =
          link.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
              active
                ? "bg-primary/10 font-medium text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="size-4" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <div className="flex h-14 items-center justify-between border-b border-border bg-card px-4 lg:hidden">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="grid size-7 place-items-center bg-brand font-mono text-[0.65rem] font-semibold text-brand-foreground">
            RG
          </span>
          <span className="text-sm font-semibold">Admin</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid size-8 place-items-center rounded-md border border-border"
          aria-label={open ? "Tutup menu" : "Buka menu"}
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {open ? (
        <div className="border-b border-border bg-card p-3 lg:hidden">{nav}</div>
      ) : null}

      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-border bg-card lg:flex">
        <div className="flex h-16 items-center gap-2 border-b border-border px-5">
          <span className="grid size-8 place-items-center bg-brand font-mono text-xs font-semibold text-brand-foreground">
            RG
          </span>
          <div>
            <p className="text-sm font-semibold leading-tight">MyPorto</p>
            <p className="text-[0.7rem] text-muted-foreground">Dashboard</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3">{nav}</div>

        <div className="border-t border-border p-3">
          <p className="truncate px-3 pb-2 text-xs text-muted-foreground">
            {email}
          </p>
          <button
            type="button"
            onClick={signOut}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LogOut className="size-4" />
            Keluar
          </button>
          <Link
            href="/"
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LayoutDashboard className="size-4" />
            Lihat situs
          </Link>
        </div>
      </aside>
    </>
  );
}
