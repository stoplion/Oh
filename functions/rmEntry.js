import { RC_PATH } from '../constants.js';
import colors from 'colors';
import fs from 'fs';
import { getEntries } from './utils.js';

export function rmEntry(alias) {
  const rcEntries = getEntries();

  const updatedEntries = rcEntries.filter((entry) => entry.alias !== alias);

  fs.writeFileSync(RC_PATH, JSON.stringify(updatedEntries));
  console.log(colors.green(`Entry ${alias} removed`));
}
