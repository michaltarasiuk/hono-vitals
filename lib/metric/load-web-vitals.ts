import {afterElementsRendered, afterFirstInput, afterLoad} from './ready'

export async function loadWebVitals(options: {
  attribution?: boolean
  deferLibraryLoad?: boolean
  loadAfterInput?: boolean
}) {
  await Promise.all([
    ...(options.deferLibraryLoad ? [afterLoad(), afterElementsRendered()] : []),
    ...(options.loadAfterInput ? [afterFirstInput()] : []),
  ])

  return options.attribution
    ? import('web-vitals/attribution')
    : import('web-vitals')
}
