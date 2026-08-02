import { cx } from "@/lib/cx";

export function Heading({ className, ...props }: React.ComponentProps<"h1">) {
  return <h1 className={cx("Heading", className)} {...props} />;
}
