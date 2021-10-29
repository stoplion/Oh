import { findEntry } from './findEntry.js';
import { updateEntry } from './updateEntry.js';

export function untagEntry(alias, tag) {
  const entry = findEntry(alias);
  const newTags = entry.tags.filter((entry) => {
    return entry !== tag;
  });

  updateEntry(alias, 'tags', newTags);
}
