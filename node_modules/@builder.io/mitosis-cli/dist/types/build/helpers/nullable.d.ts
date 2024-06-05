export type Nullable<T> = T | null | undefined;
export declare const checkIsDefined: <T>(maybeT: Nullable<T>) => maybeT is T;
