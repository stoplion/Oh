#!/usr/bin/env node

const { program } = require('commander');
const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
const opn = require('better-opn');
const Table = require('cli-table');
const _ = require('lodash');

const RC_PATH = path.join(process.env.HOME, '.ohrc');

function rmEntry(alias) {
  const rcEntries = getEntries();

  const updatedEntries = rcEntries.filter((entry) => entry.alias !== alias);

  fs.writeFileSync(RC_PATH, JSON.stringify(updatedEntries));
  console.log(`Entry ${alias} removed`);
}

function addNewEntry(alias, url) {
  const entry = {
    alias,
    url,
    tags: [],
  };

  const rcEntries = getEntries();

  const match = rcEntries.find((entry) => entry.alias === alias);

  if (match) {
    console.log(`Alias ${alias} has already been`);
    return;
  }

  rcEntries.push(entry);

  fs.writeFileSync(RC_PATH, JSON.stringify(rcEntries));
  console.log(`
    Added ${alias} entry pointing to ${url}.
  `);
}

function updateEntry(alias, key, value) {
  const updatedEntries = getEntries().map((entry) => {
    if (entry.alias == alias) {
      return {
        ...entry,
        [key]: value,
      };
    }
    return entry;
  });

  fs.writeFileSync(RC_PATH, JSON.stringify(updatedEntries));
}

function getEntries() {
  const fileStr = fs.readFileSync(RC_PATH, 'utf8');

  const data = JSON.parse(fileStr);
  return data;
}

function findEntry(alias) {
  const rcEntries = getEntries();
  const match = rcEntries.find((entry) => entry.alias === alias);

  if (match) {
    return match;
  } else {
    return false;
  }
}

function lsEntries() {
  tableLogEntries(getEntries());
}

function tableLogEntries(entries) {
  const formattedEntries = entries.map((entry) => {
    return [entry.alias, entry.url, entry.tags.join(', ')];
  });

  const table = new Table({
    head: ['alias', 'url', 'tags'],
  });

  table.push(...formattedEntries);

  shell.echo(table.toString());
}

function tagEntry(alias, tags = []) {
  const entry = findEntry(alias);
  const newTags = [...entry.tags, ...tags];

  updateEntry(alias, 'tags', newTags);
}

function untagEntry(alias, tag) {
  const entry = findEntry(alias);
  const newTags = entry.tags.filter((entry) => {
    return entry !== tag;
  });

  updateEntry(alias, 'tags', newTags);
}

function search(keyword, opts) {
  let foundEntries = [];

  if (opts.tags) {
    // oh s -t work reading
    // @TODO handle multiple tags
    foundEntries = getEntries().filter((entry) => {
      const entriesTags = entry.tags;
      return entry.tags.includes(keyword);
    });

    tableLogEntries(foundEntries);
  } else {
    // @TODO search by alias or url
  }
}

function lsTags(opts) {
  const rcEntries = getEntries().reduce(
    (memo, entry) => [...memo, ...entry.tags],
    []
  );

  const allTags = _.entries(_.countBy(rcEntries)).map(([name, count]) => [
    name,
    count,
  ]);

  const table = new Table({
    head: ['tags', 'count'],
  });

  allTags.forEach((tagTuple) => {
    table.push(tagTuple);
  });

  shell.echo(table.toString());
}

program
  .version('0.1.0')
  .command('tag')
  .description('Tag an entry')
  .argument('<alias>')
  .argument('<tags...>')
  .action((alias, tags) => {
    tagEntry(alias, tags);
    console.log(`${alias} updated with tags: ${tags.join(', ')}`);
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
  .version('0.1.0')
  .command('tags')
  .description('List all tags')
  .action(() => {
    lsTags();
  });

program
  .version('0.1.0')
  .command('search')
  .argument('<keyword>')
  .option('-t, --tags', 'Only list tags')
  .description('Search for an entry')
  .action((keyword, tags) => {
    search(keyword, tags);
  });

program
  .version('0.1.0')
  .command('init')
  .description('Init rc file in ~')
  .action(() => {
    shell.touch(RC_PATH);
    shell.exec(`echo [] >> ${RC_PATH}`);
    console.log(`.ohrc file inited at ${RC_PATH}`);
  });

program
  .version('0.1.0')
  .command('ls')
  .description('List all entries')
  .action((opts) => {
    lsEntries();
  });

program
  .version('0.1.0')
  .command('add')
  .description('Add an entry')
  .argument('<alias>')
  .argument('<url>')
  .action((alias, url) => {
    addNewEntry(alias, url);
  });

program
  .version('0.1.0')
  .command('rm')
  .description('Remove an entry')
  .argument('<alias>')
  .action((alias) => {
    rmEntry(alias);
  });

program
  .version('0.1.0')
  .argument('<alias>')
  .action((alias) => {
    const entry = findEntry(alias);

    if (!entry) {
      console.log(`Did not find an entry with the alias ${alias}`);
      return;
    }

    opn(entry.url);
  });

program.parse(process.argv);
