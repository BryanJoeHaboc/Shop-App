export interface ErrorWithSet extends Error {
  setState: (value: string) => void;
}
