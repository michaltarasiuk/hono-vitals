import "@hono/react-renderer";

declare module "*.css?inline" {
  const css: string;
  export default css;
}
