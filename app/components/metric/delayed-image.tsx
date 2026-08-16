interface DelayedImageProps extends React.ComponentProps<'img'> {
  delay?: number
}

export function DelayedImage({
  src = '/public/square.png',
  elementtiming = 'main-image',
  delay = 0,
  ...props
}: DelayedImageProps) {
  return (
    <img
      src={`${src}?delay=${delay}`}
      elementtiming={elementtiming}
      {...props}
    />
  )
}
