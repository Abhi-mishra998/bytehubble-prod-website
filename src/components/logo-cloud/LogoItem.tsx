interface LogoItemProps {
  name: string;
  children: React.ReactNode;
}

export default function LogoItem({ name, children }: LogoItemProps) {
  return (
    <div
      className="flex items-center justify-center shrink-0 h-10 sm:h-12 w-auto px-4 opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300"
      title={name}
      role="img"
      aria-label={`${name} logo`}
    >
      {children}
    </div>
  );
}

