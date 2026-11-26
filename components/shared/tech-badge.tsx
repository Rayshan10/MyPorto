import { cn } from "@/lib/utils";

type TechBadgeProps = {
  children: string;
  className?: string;
};

export function TechBadge({ children, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-border bg-transparent px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
