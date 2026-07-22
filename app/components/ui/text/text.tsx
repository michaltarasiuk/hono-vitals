export function Text({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={className ? `Text ${className}` : "Text"} {...props} />;
}
