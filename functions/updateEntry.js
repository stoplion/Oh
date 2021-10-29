import { RC_PATH } from '../constants.js';
import fs from 'fs';
import { getEntries } from './utils.js';

export function updateEntry(alias, key, value) {
  const updatedEntries = getEntries().map((entry) => {
    if (entry.alias == alias) {
      return {
        ...entry,
        [key]: value,
      };
    }
    return entry;
  });

  fs.writeFileSync(RC_PATH, JSON.stringify(updatedEntries));
}
