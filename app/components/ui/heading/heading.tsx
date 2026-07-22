export function Heading({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1 className={className ? `Heading ${className}` : "Heading"} {...props} />
  );
}
