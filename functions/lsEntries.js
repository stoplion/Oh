import { getEntries, tableLogEntries } from './utils.js';

export function lsEntries() {
  tableLogEntries(getEntries());
}
