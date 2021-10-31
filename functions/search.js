import { getEntries, tableLogEntries } from './utils.js';

import colors from 'colors';

export function search(keyword, opts) {
  let foundEntries = [];

  const prop = Object.keys(opts)[0] || 'tags';

  foundEntries = getEntries().filter((entry) => {
    return entry[prop].includes(keyword);
  });

  if (foundEntries.length === 0) {
    console.log(`No search results for: ${keyword}`);
    return;
  }

  console.log(colors.green(`Search results for ${prop}: ${keyword}`));
  tableLogEntries(foundEntries);
}
