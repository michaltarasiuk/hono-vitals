export function uppercaseFirst([first = "", ...rest]: string) {
  return first.toUpperCase() + rest.join("");
}
