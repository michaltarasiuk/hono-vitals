interface DelayedImageProps extends Omit<React.ComponentProps<'img'>, 'src'> {
  delay?: number
}

export function DelayedImage({
  delay = 0,
  elementtiming = 'main-image',
  ...props
}: DelayedImageProps) {
  return (
    <img
      src={`/public/square.png?delay=${delay}`}
      elementtiming={elementtiming}
      {...props}
    />
  )
}
