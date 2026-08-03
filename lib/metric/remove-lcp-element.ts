import { isDefined } from "@/lib/is-defined";
import { yieldToEventLoop } from "@/lib/delay";

import { afterElementsRendered } from "./wait-for";

export async function removeLcpElement() {
  await afterElementsRendered();
  await yieldToEventLoop();
  const img = document.getElementById("lcp-image");
  if (isDefined(img)) {
    img.remove();
  }
}
