interface SquareImageProps extends Omit<React.ComponentProps<'img'>, 'src'> {
  delay?: number
}

export function SquareImage({delay = 0, ...props}: SquareImageProps) {
  return <img src={`/public/square.png?delay=${delay}`} {...props} />
}
