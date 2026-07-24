import { afterElementsRendered, afterFirstInput, afterLoad } from "./wait-for";

export async function loadWebVitals(options: {
  attribution?: boolean;
  lazyLoad?: boolean;
  loadAfterInput?: boolean;
}) {
  const readyPromises: Promise<void>[] = [];

  if (options.lazyLoad) {
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
