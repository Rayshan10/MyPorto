import { Mail, MailOpen, Reply } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { deleteMessage, markMessageRead } from "@/lib/actions/messages";
import { AdminPageHeader, EmptyState } from "@/components/admin/page-header";
import { DeleteForm } from "@/components/admin/delete-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  const unreadCount = (messages ?? []).filter((item) => !item.is_read).length;

  return (
    <div>
      <AdminPageHeader
        title="Pesan"
        description={
          unreadCount > 0
            ? `${unreadCount} pesan belum dibaca.`
            : "Semua pesan sudah dibaca."
        }
      />

      {error ? (
        <p className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          {error.message}
        </p>
      ) : null}

      {!messages || messages.length === 0 ? (
        <EmptyState
          title="Belum ada pesan"
          description="Pesan dari formulir kontak akan muncul di sini."
        />
      ) : (
        <div className="space-y-2">
          {messages.map((message) => (
            <article
              key={message.id}
              className={cn(
                "rounded-xl border bg-card p-4",
                message.is_read
                  ? "border-border"
                  : "border-primary/30 bg-primary/[0.03]",
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    {!message.is_read ? (
                      <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                    ) : null}
                    <p className="text-sm font-medium">{message.name}</p>
                    <a
                      href={`mailto:${message.email}`}
                      className="truncate text-xs text-muted-foreground hover:text-foreground"
                    >
                      {message.email}
                    </a>
                  </div>
                  {message.subject ? (
                    <p className="mt-1 text-sm font-medium">
                      {message.subject}
                    </p>
                  ) : null}
                </div>

                <span className="shrink-0 text-xs text-muted-foreground">
                  {formatDateTime(message.created_at)}
                </span>
              </div>

              <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">
                {message.message}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-1 border-t border-border pt-2">
                <Button asChild variant="ghost" size="sm" className="h-8">
                  <a href={`mailto:${message.email}`}>
                    <Reply className="size-4" />
                    Balas
                  </a>
                </Button>

                <form action={markMessageRead}>
                  <input type="hidden" name="id" value={message.id} />
                  <input
                    type="hidden"
                    name="value"
                    value={message.is_read ? "false" : "true"}
                  />
                  <Button
                    type="submit"
                    variant="ghost"
                    size="sm"
                    className="h-8 text-muted-foreground"
                  >
                    {message.is_read ? (
                      <Mail className="size-4" />
                    ) : (
                      <MailOpen className="size-4" />
                    )}
                    {message.is_read
                      ? "Tandai belum dibaca"
                      : "Tandai sudah dibaca"}
                  </Button>
                </form>

                <div className="ml-auto">
                  <DeleteForm
                    action={deleteMessage}
                    id={message.id}
                    confirmMessage={`Hapus pesan dari ${message.name}?`}
                    label="Hapus pesan"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
