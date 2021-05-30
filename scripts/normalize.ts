/* eslint-disable no-console */
import program from 'commander';
program.version('0.0.1');
import { transform } from '@moneyforward/stream-util';

program.parse(process.argv);
if (program.args.length) {
  const text = program.args[0];
  console.log(text.normalize('NFKC').replaceAll(' ', ''));
} else {
  (async () => {
    for await (const line of process.stdin.pipe(new transform.Lines())) {
      console.log(line.normalize('NFKC').replaceAll(' ', ''));
    }
  })();
}
