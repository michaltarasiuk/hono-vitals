interface MetricSquareProps extends Omit<React.ComponentProps<"img">, "src"> {
  delay?: number;
}

export function MetricSquare({
  delay,
  alt = "Gray square",
  ...props
}: MetricSquareProps) {
  const src =
    delay == null ? "/public/square.png" : `/public/square.png?delay=${delay}`;

  return <img src={src} alt={alt} {...props} />;
}
