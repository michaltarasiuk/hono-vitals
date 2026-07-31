import { isDefined } from "@/lib/is-defined";

interface MetricSquareProps extends Omit<React.ComponentProps<"img">, "src"> {
  delay?: number;
}

export function MetricSquare({
  delay,
  alt = "Gray square",
  ...props
}: MetricSquareProps) {
  let src = "/public/square.png";
  if (isDefined(delay)) {
    src += `?delay=${delay}`;
  }

  return <img src={src} alt={alt} {...props} />;
}
