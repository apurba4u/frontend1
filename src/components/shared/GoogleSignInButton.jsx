"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { renderGoogleButton } from "@/services/googleAuthService";
import { toast } from "react-toastify";

export default function GoogleSignInButton({ text = "continue_with" }) {
  const containerRef = useRef(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const init = async () => {
      try {
        await renderGoogleButton(
          containerRef.current,
          (result) => {
            if (result.success) {
              toast.success("Signed in with Google successfully!");
              window.location.href = "/";
            }
          },
          (err) => {
            // Don't show error for user cancellation
            if (err.message?.includes("cancelled") || err.message?.includes("dismissed")) {
              return;
            }
            setError(err.message || "Google sign in failed");
            toast.error(err.message || "Google sign in failed");
          }
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  if (error) {
    return (
      <div className="w-full py-3 px-4 rounded-xl border border-error/30 bg-error-container/10 text-error text-sm text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full relative">
      {isLoading && (
        <div className="w-full py-3.5 rounded-xl border border-outline-variant/30 bg-surface-container flex items-center justify-center gap-3">
          <div className="w-5 h-5 border-2 border-on-surface-variant border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-on-surface-variant">Loading Google Sign In...</span>
        </div>
      )}
      <div
        ref={containerRef}
        className={`w-full flex justify-center ${isLoading ? "hidden" : ""}`}
        style={{ minHeight: "44px" }}
      />
    </div>
  );
}
