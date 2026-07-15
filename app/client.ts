import type { ReactElement } from "react";

import { createClient } from "honox/client";
import { createElement } from "react";
import { hydrateRoot } from "react-dom/client";

createClient<ReactElement>({
  createElement: (type, props) => {
    return createElement(type, props);
  },
  hydrate: async (elem, root) => {
    hydrateRoot(root, elem);
  },
});
