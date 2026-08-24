import {createClient} from 'honox/client';
import {createElement} from 'react';
import {hydrateRoot} from 'react-dom/client';

void createClient<React.ReactElement>({
  createElement: (t, p) => {
    return createElement(t, p);
  },
  hydrate: (e, r) => {
    hydrateRoot(r, e);
  },
});
