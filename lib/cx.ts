export function cx(base: string, className?: unknown) {
  return typeof className === "string" && className.length > 0
    ? `${base} ${className}`
    : base;
}
