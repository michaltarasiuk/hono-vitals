import "web-vitals";

declare module "web-vitals" {
  interface Metric {
    instance?: number;
  }
}
