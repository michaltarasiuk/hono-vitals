import "hono";

declare module "hono" {
  interface ContextRenderer {
    (content: string | Promise<string>): Response | Promise<Response>;
  }
}
