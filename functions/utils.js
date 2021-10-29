import { RC_PATH } from '../constants.js';
import Table from 'cli-table';
import fs from 'fs';
import shell from 'shelljs';

export function getEntries() {
  const fileStr = fs.readFileSync(RC_PATH, 'utf8');

  const data = JSON.parse(fileStr);
  return data;
}

export function tableLogEntries(entries) {
  const formattedEntries = entries.map((entry) => {
    return [entry.alias, entry.url, entry.tags.join(', ')];
  });

  const table = new Table({
    head: ['alias', 'url', 'tags'],
  });

  table.push(...formattedEntries);

  shell.echo(table.toString());
}
