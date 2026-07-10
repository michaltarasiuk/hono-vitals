import { afterElementsRendered } from "./ready";

export async function removeLcpElement() {
  await afterElementsRendered();
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 0);
  });
  const img = document.getElementById("lcp-image");
  if (img) {
    img.remove();
  }
}
