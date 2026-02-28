"use client";

interface TerminalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function TerminalButton({
  children,
  loading = false,
  disabled,
  className = "",
  ...props
}: TerminalButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={[
        "relative px-6 py-2.5 min-h-[44px] border border-terminal-glow rounded font-mono text-sm",
        "text-terminal-glow bg-transparent transition-all duration-200",
        "hover:bg-terminal-glow/10 hover:shadow-terminal-glow",
        "active:bg-terminal-glow/20",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:shadow-none",
        className,
      ].join(" ")}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center gap-1">
          Sending message...
          <span className="inline-block w-2 h-4 bg-terminal-glow animate-cursor-blink" />
        </span>
      ) : (
        children
      )}
    </button>
  );
}
