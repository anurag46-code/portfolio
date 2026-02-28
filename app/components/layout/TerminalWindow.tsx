import TerminalHeader from "./TerminalHeader";
import Navigation from "./Navigation";

interface TerminalWindowProps {
  children: React.ReactNode;
}

export default function TerminalWindow({ children }: TerminalWindowProps) {
  return (
    <div className="min-h-screen bg-terminal-bg flex justify-center px-2 py-4 sm:px-4 sm:py-8">
      <div className="terminal-window w-full max-w-[1200px] shadow-terminal-glow rounded-lg overflow-hidden">
        <TerminalHeader />
        <Navigation />
        <main className="overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
