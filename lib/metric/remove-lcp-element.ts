import { isDefined } from "@/lib/shared/is-defined";

import { afterElementsRendered } from "./ready";

export async function removeLcpElement() {
  await afterElementsRendered();
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 0);
  });
  const img = document.getElementById("lcp-image");
  if (isDefined(img)) {
    img.remove();
  }
}
