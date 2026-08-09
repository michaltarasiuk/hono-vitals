export function SquareImage({
  delay = 0,
  ...props
}: {delay?: number} & React.ComponentProps<'img'>) {
  return <img src={`/public/square.png?delay=${delay}`} {...props} />
}
