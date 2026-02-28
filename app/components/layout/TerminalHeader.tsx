interface TerminalHeaderProps {
  title?: string;
}

export default function TerminalHeader({ title = "portfolio.exe" }: TerminalHeaderProps) {
  return (
    <div className="terminal-header">
      <div className="flex items-center gap-2">
        <div className="terminal-dot bg-red-500" />
        <div className="terminal-dot bg-yellow-500" />
        <div className="terminal-dot bg-green-500" />
      </div>
      <span className="ml-2 text-terminal-dim text-sm select-none">
        {title}
      </span>
    </div>
  );
}
