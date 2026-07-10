export function formatFlagLabel(key: string): string {
  const [first, ...rest] = key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Za-z])(\d)/g, "$1 $2")
    .toLowerCase();

  return first.toUpperCase() + rest.join("");
}
