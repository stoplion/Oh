import { getEntries, tableLogEntries } from './utils.js';

import colors from 'colors';

export function search(keyword, opts) {
  let foundEntries = [];

  if (opts.tags) {
    // oh s -t work reading
    // @TODO handle multiple tags
    foundEntries = getEntries().filter((entry) => {
      const entriesTags = entry.tags;
      return entry.tags.includes(keyword);
    });

    if (foundEntries.length === 0) {
      console.log(`No search results for: ${keyword}`);
      return;
    }

    tableLogEntries(foundEntries);
  } else {
    // @TODO search by alias or url
  }
}
