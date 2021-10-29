import { findEntry } from './findEntry.js';
import { updateEntry } from './updateEntry.js';

export function tagEntry(alias, tags = []) {
  const entry = findEntry(alias);
  const newTags = [...entry.tags, ...tags.map((tag) => tag.toLowerCase())];

  updateEntry(alias, 'tags', newTags);
}
