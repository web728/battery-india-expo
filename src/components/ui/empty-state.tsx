import { Inbox } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-silver bg-grey-light px-6 py-16 text-center">
      <Inbox className="mb-4 h-10 w-10 text-grey-medium" aria-hidden="true" />
      <h3 className="text-lg font-bold text-navy-dark">{title}</h3>
      {description && <p className="mt-2 max-w-md text-sm text-grey-medium">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
