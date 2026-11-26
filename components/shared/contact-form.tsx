"use client";

import { useActionState } from "react";
import { Send } from "lucide-react";
import { sendContactMessage, type ContactState } from "@/lib/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    sendContactMessage,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">Nama</Label>
          <Input id="name" name="name" placeholder="Nama Anda" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="nama@perusahaan.com"
            required
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="subject">Subjek</Label>
        <Input
          id="subject"
          name="subject"
          placeholder="Peluang kerja atau kolaborasi"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">Pesan</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Ceritakan singkat tentang posisi atau proyek yang ingin didiskusikan."
          rows={5}
          required
        />
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="submit"
          disabled={isPending}
          className="h-10 px-4 font-mono text-[0.65rem] uppercase tracking-[0.16em]"
        >
          <Send className="size-3.5" />
          {isPending ? "Mengirim..." : "Kirim Pesan"}
        </Button>
        <p className="text-xs text-muted-foreground">
          Pesan masuk ke inbox dan email saya.
        </p>
      </div>

      {state.status !== "idle" && state.message ? (
        <p
          role="status"
          className={
            state.status === "success"
              ? "border border-brand/50 bg-brand/10 px-3 py-2 text-sm text-foreground"
              : "border border-dashed border-border px-3 py-2 text-sm text-muted-foreground"
          }
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
