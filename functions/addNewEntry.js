import { RC_PATH } from '../constants.js';
import colors from 'colors';
import fs from 'fs';
import { getEntries } from './utils.js';
import isUrl from 'is-url';
import prependHTTP from 'prepend-http';

export function addNewEntry(alias, url, tags) {
  if (!isUrl(prependHTTP(url))) {
    console.log(colors.red(`Not an URL: ${url}`));
    return;
  }

  const entry = {
    alias: alias,
    url: prependHTTP(url),
    tags,
  };

  const rcEntries = getEntries();

  const match = rcEntries.find((entry) => entry.alias === alias);

  if (match) {
    console.log(colors.red(`Alias ${alias} has already been`));
    return;
  }

  rcEntries.push(entry);

  fs.writeFileSync(RC_PATH, JSON.stringify(rcEntries));

  console.log(colors.green(`Added ${alias} entry pointing to ${url}.`));
}
