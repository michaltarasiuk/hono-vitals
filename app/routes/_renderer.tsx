import { reactRenderer } from "@hono/react-renderer";
import { Link, Script } from "honox/server";

import devStyles from "../styles/global.css?inline";

export default reactRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="preload"
          href="/public/fonts/inter-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/public/favicon.svg" type="image/svg+xml" />
        {import.meta.env.DEV ? (
          <style dangerouslySetInnerHTML={{ __html: devStyles }} />
        ) : (
          <Link href="/app/styles/global.css" rel="stylesheet" />
        )}
        <Script src="/app/client.ts" async />
      </head>
      <body>
        <div className="AppRoot">{children}</div>
      </body>
    </html>
  );
});
