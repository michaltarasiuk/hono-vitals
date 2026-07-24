import { afterElementsRendered, afterFirstInput, afterLoad } from "./wait-for";

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

  if (options.attribution) {
    return import("web-vitals/attribution");
  }
  return import("web-vitals");
}
