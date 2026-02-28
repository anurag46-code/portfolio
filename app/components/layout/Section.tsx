interface SectionProps {
  id: string;
  title?: string;
  children: React.ReactNode;
}

export default function Section({ id, title, children }: SectionProps) {
  return (
    <section
      id={id}
      className="px-4 py-12 sm:px-6 md:px-8 lg:py-16 scroll-mt-16"
      aria-labelledby={title ? `${id}-heading` : undefined}
    >
      {title && (
        <h2
          id={`${id}-heading`}
          className="glow-text text-xl sm:text-2xl mb-6 border-b border-terminal-border pb-2"
        >
          <span className="text-terminal-glow">&gt;</span> {title}
        </h2>
      )}
      {children}
    </section>
  );
}
