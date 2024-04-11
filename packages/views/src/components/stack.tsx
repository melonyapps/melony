import { cn } from "@melony/ui/lib";

export function Stack({
  children,
  horizontal,
  gapSize,
}: {
  children: React.ReactNode;
  horizontal?: boolean;
  gapSize?: "sm" | "md" | "lg";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        { "flex-row": horizontal },
        { "gap-2": gapSize === "sm" },
        { "gap-6": gapSize === "lg" }
      )}
    >
      {children}
    </div>
  );
}
