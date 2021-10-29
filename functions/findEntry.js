import { getEntries } from './utils.js';

export function findEntry(alias) {
  const rcEntries = getEntries();
  const match = rcEntries.find((entry) => entry.alias === alias);

  if (match) {
    return match;
  } else {
    return false;
  }
}
