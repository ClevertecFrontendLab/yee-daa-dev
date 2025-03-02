export const isArrayWithItems = <T>(array: unknown | null | undefined | T[]): array is T[] =>
    Array.isArray(array) && array.length > 0;
