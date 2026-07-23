export function delay(timeout: number) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

export function yieldToEventLoop() {
  return delay(0);
}
