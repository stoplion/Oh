import Table from 'cli-table';
import _ from 'lodash';
import { getEntries } from './utils.js';
import shell from 'shelljs';

export function lsTags(opts) {
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
