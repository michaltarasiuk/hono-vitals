export function joinPath(...segments: string[]) {
  return `/${segments.join('/')}`;
}
