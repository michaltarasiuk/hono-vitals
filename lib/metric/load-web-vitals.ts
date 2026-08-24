import {afterElementsRendered, afterFirstInput, afterLoad} from './ready';

export async function loadWebVitals(options: {
  attribution?: boolean;
  deferLibraryLoad?: boolean;
  loadAfterInput?: boolean;
}) {
  const readyPromises: Promise<void>[] = [];

  if (options.deferLibraryLoad) {
    readyPromises.push(afterLoad(), afterElementsRendered());
  }
  if (options.loadAfterInput) {
    readyPromises.push(afterFirstInput());
  }

  await Promise.all(readyPromises);

  return options.attribution
    ? import('web-vitals/attribution')
    : import('web-vitals');
}
