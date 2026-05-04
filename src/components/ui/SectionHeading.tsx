interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  label,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl ${alignClass} mb-12 lg:mb-16`}>
      {label && (
        <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent mb-3">
          {label}
        </span>
      )}
      <h2 className="text-2xl font-bold text-dark-accent sm:text-3xl lg:text-4xl xl:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-dark-accent/70 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
