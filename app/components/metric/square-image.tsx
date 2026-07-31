import { isDefined } from "@/lib/is-defined";

interface SquareImageProps extends Omit<React.ComponentProps<"img">, "src"> {
  delay?: number;
}

export function SquareImage({
  delay,
  alt = "Gray square",
  ...props
}: SquareImageProps) {
  let src = "/public/square.png";
  if (isDefined(delay)) {
    src += `?delay=${delay}`;
  }

  return <img src={src} alt={alt} {...props} />;
}
