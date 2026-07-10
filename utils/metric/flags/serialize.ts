export function applyFlags(flags: Record<string, boolean>): void {
  const url = new URL(window.location.href);
  for (const [key, value] of Object.entries(flags)) {
    if (value) {
      url.searchParams.set(key, "true");
    } else {
      url.searchParams.delete(key);
    }
  }
  window.location.assign(url);
}
