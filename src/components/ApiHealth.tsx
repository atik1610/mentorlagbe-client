"use client";

import { useEffect, useState } from "react";

type ApiStatus = "checking" | "connected" | "offline";

export default function ApiHealth() {
  const [status, setStatus] = useState<ApiStatus>("checking");

  useEffect(() => {
    const controller = new AbortController();
    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
    fetch(`${baseUrl}/health`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("API unavailable");
        return res.json();
      })
      .then((data: { status?: string }) => setStatus(data.status === "ok" ? "connected" : "offline"))
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        setStatus("offline");
      });
    return () => controller.abort();
  }, []);

  const label = status === "connected" ? "Connected" : status === "checking" ? "Checking..." : "Offline";
  return (
    <div className="health-panel" role="status" aria-live="polite">
      <span className={`health-dot health-${status}`} />
      <span><strong>Express API</strong> — {label}</span>
      <span className="health-note">http://localhost:5000/health</span>
    </div>
  );
}
