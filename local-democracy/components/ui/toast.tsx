"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToastProps {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  onClose: (id: string) => void;
}

export function Toast({ id, message, type, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(id), 300); // Allow time for exit animation
    }, 3000);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-md p-4 shadow-md transition-all duration-300",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        type === "success" &&
          "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
        type === "error" &&
          "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
        type === "warning" &&
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
        type === "info" &&
          "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
      )}
    >
      <span>{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onClose(id), 300);
        }}
        className="ml-2 rounded-full p-1 hover:bg-black/10"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function ToastContainer({
  toasts,
  onClose,
}: {
  toasts: {
    id: string;
    message: string;
    type: "success" | "error" | "info" | "warning";
  }[];
  onClose: (id: string) => void;
}) {
  return (
    <>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </>
  );
}
