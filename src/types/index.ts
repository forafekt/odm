export type KeyValues = Record<string, any>;
export interface Options {
  keyValues: KeyValues;
  fromObject?: boolean;
  insertIndex?: boolean;
  debug?: boolean;
}
