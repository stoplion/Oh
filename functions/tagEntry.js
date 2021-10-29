import { findEntry } from './findEntry.js';
import { updateEntry } from './updateEntry.js';

export function tagEntry(alias, tags = []) {
  const entry = findEntry(alias);
  if (!entry) {
    return false;
  }
  const newTags = [...entry.tags, ...tags.map((tag) => tag.toLowerCase())];

  updateEntry(alias, 'tags', newTags);
  return true;
}
