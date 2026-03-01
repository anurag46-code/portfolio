"use client";

import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type ToastType = "success" | "error";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

let toastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: number) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  );
}

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: number) => void;
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const isSuccess = toast.type === "success";

  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  return (
    <motion.div
      layout
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      role={isSuccess ? "status" : "alert"}
      className={[
        "pointer-events-auto max-w-sm w-full px-4 py-3 border-2 rounded font-mono text-sm",
        "bg-terminal-bg/95 backdrop-blur-sm cursor-pointer",
        isSuccess
          ? "border-terminal-glow text-terminal-glow shadow-terminal-glow"
          : "border-red-500 text-red-400 shadow-[0_0_10px_#ef444466,0_0_20px_#ef444433]",
      ].join(" ")}
      onClick={() => onRemove(toast.id)}
    >
      <div className="flex items-start gap-2">
        <span className="shrink-0 mt-0.5">
          {isSuccess ? "[OK]" : "[ERR]"}
        </span>
        <span className="break-words">{toast.message}</span>
      </div>
    </motion.div>
  );
}
