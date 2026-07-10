import type { ReactElement } from "react";
import { createClient } from "honox/client";

createClient<ReactElement>({
  hydrate: async (elem, root) => {
    const { hydrateRoot } = await import("react-dom/client");
    hydrateRoot(root, elem);
  },
});
