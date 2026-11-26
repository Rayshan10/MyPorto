"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SubmitButton({
  children,
  pendingLabel = "Menyimpan...",
  className,
}: {
  children: React.ReactNode;
  pendingLabel?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className={cn("h-10", className)}>
      {pending ? <Loader2 className="size-4 animate-spin" /> : null}
      {pending ? pendingLabel : children}
    </Button>
  );
}

export function FormMessage({
  error,
  success,
}: {
  error?: string;
  success?: string;
}) {
  if (!error && !success) return null;

  return (
    <p
      role={error ? "alert" : "status"}
      className={cn(
        "rounded-md border px-3 py-2 text-sm",
        error
          ? "border-red-200 bg-red-50 text-red-700"
          : "border-emerald-200 bg-emerald-50 text-emerald-700",
      )}
    >
      {error ?? success}
    </p>
  );
}
