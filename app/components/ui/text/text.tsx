import { cx } from "@/lib/cx";

export function Text({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cx("Text", className)} {...props} />;
}
