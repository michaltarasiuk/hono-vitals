export type Defined<T> = NonNullable<T>;

export function isDefined<T>(value: T): value is Defined<T> {
  return value != null;
}
