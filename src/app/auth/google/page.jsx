"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function GoogleCallbackContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      window.opener?.postMessage(
        { type: "GOOGLE_AUTH_ERROR", error },
        window.location.origin
      );
      return;
    }

    if (code) {
      window.opener?.postMessage(
        { type: "GOOGLE_AUTH_CODE", code },
        window.location.origin
      );
    } else {
      window.opener?.postMessage(
        { type: "GOOGLE_AUTH_ERROR", error: "No authorization code received" },
        window.location.origin
      );
    }
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-surface">
      <div className="text-center">
        <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-on-surface-variant">Completing authentication...</p>
      </div>
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-surface">
          <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      }
    >
      <GoogleCallbackContent />
    </Suspense>
  );
}
