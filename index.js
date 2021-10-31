#!/usr/bin/env node

import { Option, program } from 'commander';

import { RC_PATH } from './constants.js';
import { addNewEntry } from './functions/addNewEntry.js';
import colors from 'colors';
import { findEntry } from './functions/findEntry.js';
import { lsEntries } from './functions/lsEntries.js';
import { lsTags } from './functions/lsTags.js';
import open from 'open';
import opn from 'better-opn';
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
    if (tagEntry(alias, tags)) {
      console.log(
        colors.green(
          `${alias} updated with tags: ${tags
            .map((tag) => tag.toLowerCase())
            .join(', ')}`
        )
      );
    } else {
      console.log(colors.red(`alias: "${alias}" not found`));
    }
  });

program
  .version('0.1.0')
  .command('untag')
  .description('Untag an entry')
  .argument('<alias>')
  .argument('<tag>')
  .action((alias, tag) => {
    untagEntry(alias, tag);
    console.log(colors.green(`${tag} removed from alias: ${alias}.`));
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
  .option('-t, --tags', 'Search by tags')
  .option('-u, --url', 'Search by url')
  .option('-a, --alias', 'Search by alias')
  .description('Search for an entry')
  .action((keyword, opts) => {
    search(keyword, opts);
  });

program
  .command('init')
  .version('0.1.0')
  .description('Init rc file in ~')
  .action(() => {
    shell.touch(RC_PATH);
    shell.exec(`echo [] >> ${RC_PATH}`);
    console.log(colors.green(`.ohrc file inited at ${RC_PATH}`));
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

// oh gh --chrome
//
program
  .argument('<alias>')
  .addOption(
    new Option('-b, --browser <browser>', 'Open in specfic browser').choices([
      'chrome',
      'firefox',
      'edge',
    ])
  )
  .action((alias, opts) => {
    const entry = findEntry(alias);

    if (!entry) {
      console.log(`Did not find an entry with the alias ${alias}`);
      return;
    }

    const browser = (function() {
      switch (opts.browser) {
        case 'firefox':
          return 'firefox';
        case 'edge':
          return 'edge';
        default:
          return 'google chrome';
      }
    })();

    const openProps = { app: { name: browser } };

    open(entry.url, openProps);
  });

program.parse(process.argv);
