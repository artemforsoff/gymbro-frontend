export type Nullable<T> = T | null;

export type TransformFields<T, K extends keyof T, U> = {
  [P in keyof T]: P extends K ? U : T[P];
};
