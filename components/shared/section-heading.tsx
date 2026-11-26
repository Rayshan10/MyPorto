type SectionHeadingProps = {
  index: string;
  label: string;
  title: string;
  description?: string;
  stacked?: boolean;
};

export function SectionHeading({
  index,
  label,
  title,
  description,
  stacked = false,
}: SectionHeadingProps) {
  return (
    <div>
      <div className="flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
        <span className="text-foreground">{index}</span>
        <span className="h-px w-8 bg-border" aria-hidden />
        <span>{label}</span>
      </div>

      <div
        className={
          stacked
            ? "mt-5"
            : "mt-5 grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-12"
        }
      >
        <h2 className="display max-w-xl text-4xl text-balance sm:text-5xl">
          {title}
        </h2>
        {description ? (
          <p
            className={
              stacked
                ? "prose-copy mt-4 max-w-md"
                : "prose-copy max-w-md lg:pb-1.5"
            }
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
