import { reactRenderer } from "@hono/react-renderer";
import { Link, Script } from "honox/server";

import devStyles from "../style.css?inline";

export default reactRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {import.meta.env.DEV ? (
          <style dangerouslySetInnerHTML={{ __html: devStyles }} />
        ) : (
          <Link href="/app/style.css" rel="stylesheet" />
        )}
        <Script src="/app/client.ts" async />
      </head>
      <body>{children}</body>
    </html>
  );
});
