import type { ReactElement } from "react";

import { createClient } from "honox/client";

createClient<ReactElement>({
  createElement: async (type, props) => {
    const { createElement } = await import("react");
    return createElement(type, props);
  },
  hydrate: async (elem, root) => {
    const { hydrateRoot } = await import("react-dom/client");
    hydrateRoot(root, elem);
  },
});
