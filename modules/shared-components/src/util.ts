/**
 * Stricter keyof. Assumes type T exhaustively declares all possible named
 * properties!
 */
export type RecordKey<T> =
  T extends Partial<infer R>
    ? R extends Record<infer K, unknown>
      ? K
      : never
    : never;

/**
 * Stricter type for members of Object.entries(t). Assumes type T exhaustively
 * declares all possible named properties!
 */
export type RecordEntry<T> = {
  [K in RecordKey<T>]: [K, Required<T>[K]];
}[RecordKey<T>];

/**
 * An invocation of Object.keys that strongly assumes the only possible keys are
 * those explicitly declared by the type. This is unsafe if the object may have
 * excess properties that are not declared by the type, which is allowed in a
 * structural typing system.
 */
export function unsafeKeys<const T extends Readonly<NonNullable<unknown>>>(
  obj: T,
) {
  return Object.keys(obj) as RecordKey<T>[];
}

/**
 * An invocation of Object.entries that strongly assumes the only possible
 * entries are those explicitly declared by the type. This is unsafe if the
 * object may have excess properties that are not declared by the type, which is
 * allowed in a structural typing system.
 */
export function unsafeEntries<const T extends Readonly<NonNullable<unknown>>>(
  obj: T,
) {
  return Object.entries(obj) as RecordEntry<T>[];
}

/** The type of an array's members. */
export type MemberOf<Arr extends readonly unknown[]> = Arr[number];

/**
 * Convenience wrapper for array includes, which can act as a type predicate.
 * {@link https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates }
 */
export function isMember<Arr extends readonly unknown[]>(
  arr: Arr,
  candidate: unknown,
): candidate is MemberOf<Arr> {
  return arr.includes(candidate);
}
