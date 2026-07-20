"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { TextField } from "@/components/ui/form-fields";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setStatus("loading");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setStatus("error");
      setError(data?.error ?? "Something went wrong. Please try again.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <TextField
        id="login-email"
        type="email"
        label="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="login-password"
        type="password"
        label="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && (
        <p role="alert" className="text-sm font-medium text-red">
          {error}
        </p>
      )}
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        Log In
      </Button>
    </form>
  );
}