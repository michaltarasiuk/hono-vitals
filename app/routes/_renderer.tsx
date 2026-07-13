import { reactRenderer } from "@hono/react-renderer";
import { Link, Script } from "honox/server";

import devStyles from "../styles/global.css";

export default reactRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Link href="/public/favicon.svg" rel="icon" type="image/svg+xml" />
        {import.meta.env.DEV ? (
          <style dangerouslySetInnerHTML={{ __html: devStyles }} />
        ) : (
          <Link href="/app/styles/global.css" rel="stylesheet" />
        )}
        <Script src="/app/client.ts" async />
      </head>
      <body>{children}</body>
    </html>
  );
});
