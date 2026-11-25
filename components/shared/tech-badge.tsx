import { cn } from "@/lib/utils";

type TechBadgeProps = {
  children: string;
  className?: string;
};

export function TechBadge({ children, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[0.7rem] text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
