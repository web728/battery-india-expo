import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

export function DashboardShell({
  roleLabel,
  name,
  children,
}: {
  roleLabel: string;
  name: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-grey-light py-10 sm:py-14">
      <Container>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-grey-medium">Welcome back,</p>
            <h1 className="font-heading text-2xl font-bold text-navy-dark sm:text-3xl">{name}</h1>
          </div>
          <Badge tone="navy">{roleLabel} Dashboard</Badge>
        </div>
        <div className="grid grid-cols-1 gap-6">{children}</div>
      </Container>
    </div>
  );
}

export function DashboardCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-grey-light bg-white p-6 shadow-sm">
      <h2 className="mb-4 font-heading text-base font-bold text-navy-dark">{title}</h2>
      {children}
    </div>
  );
}
