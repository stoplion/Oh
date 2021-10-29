#!/usr/bin/env node

import { RC_PATH } from './constants.js';
import { addNewEntry } from './functions/addNewEntry.js';
import { lsEntries } from './functions/lsEntries.js';
import { lsTags } from './functions/lsTags.js';
import opn from 'better-opn';
import { program } from 'commander';
import { rmEntry } from './functions/rmEntry.js';
import { search } from './functions/search.js';
import shell from 'shelljs';
import { tagEntry } from './functions/tagEntry.js';
import { untagEntry } from './functions/untagEntry.js';

program
  .command('tag')
  .alias('t')
  .description('Tag an entry')
  .argument('<alias>')
  .argument('<tags...>')
  .action((alias, tags) => {
    tagEntry(alias, tags);
    console.log(
      `${alias} updated with tags: ${tags
        .map((tag) => tag.toLowerCase())
        .join(', ')}`
    );
  });

program
  .version('0.1.0')
  .command('untag')
  .description('Untag an entry')
  .argument('<alias>')
  .argument('<tag>')
  .action((alias, tag) => {
    untagEntry(alias, tag);
    console.log(`${tag} removed from alias: ${alias}.`);
  });

program
  .command('tags')
  .description('List all tags')
  .action(() => {
    lsTags();
  });

program
  .command('search')
  .alias('s')
  .argument('<keyword>')
  .option('-t, --tags', 'Only list tags')
  .description('Search for an entry')
  .action((keyword, tags) => {
    search(keyword, tags);
  });

program
  .command('init')
  .version('0.1.0')
  .description('Init rc file in ~')
  .action(() => {
    shell.touch(RC_PATH);
    shell.exec(`echo [] >> ${RC_PATH}`);
    console.log(`.ohrc file inited at ${RC_PATH}`);
  });

program
  .command('ls')
  .description('List all entries')
  .action((opts) => {
    lsEntries();
  });

program
  .command('add')
  .description('Add an entry')
  .argument('<alias>')
  .argument('<url>')
  .option('-t, --tags [tags...]', 'Tag an entry')
  .action((alias, url, opts) => {
    addNewEntry(alias, url, opts.tags);
  });

program
  .command('rm')
  .description('Remove an entry')
  .argument('<alias>')
  .action((alias) => {
    rmEntry(alias);
  });

program.argument('<alias>').action((alias) => {
  const entry = findEntry(alias);

  if (!entry) {
    console.log(`Did not find an entry with the alias ${alias}`);
    return;
  }

  opn(entry.url);
});

program.parse(process.argv);
