import * as fs from 'fs';
import program from 'commander';
program.version('0.0.1');
import Mecab from 'mecab-async';
import { transform } from '@moneyforward/stream-util';

const mecab = new Mecab();
mecab.command =
  'mecab -d /usr/lib/x86_64-linux-gnu/mecab/dic/mecab-ipadic-neologd';

let wordCount = [];
const parse = (text) => {
  mecab.parse(text, (error, result) => {
    let readings = [];
    let before;
    for (const token of result) {
      if (['助詞', '記号'].indexOf(token[1]) < 0) {
        switch (token[1]) {
          case '助動詞':
            if (before && before[1] !== '助動詞') {
              readings.pop();
              readings.push(before[0] + token[0]);
            } else {
              readings.push(token[0]);
            }
            break;
          case '名詞':
            if (before && before[1] === '名詞' && token[2] === '接尾') {
              readings.pop();
              readings.push(before[0] + token[0]);
            } else {
              readings.push(token[0]);
            }
            break;
          default:
            readings.push(token[0]);
            break;
        }
        before = token;
      }
    }
    readings = readings.filter((i) => {
      return i.length !== 1;
    });
    for (const reading of readings) {
      const words = wordCount.map((i) => {
        return i.value;
      });
      if (words.indexOf(reading) > 0) {
        for (const entry of wordCount) {
          if (entry.value === reading) {
            entry.count += 1;
            Object.assign(wordCount, entry);
          }
        }
      } else {
        wordCount.push({
          value: reading,
          count: 1,
        });
      }
    }
    wordCount = wordCount.filter((i) => {
      return i.count > 1;
    });
    // TODO 入力ファイルのある場所に置くべき
    fs.writeFileSync(
      './src/data/voice_single_mother_2020_08_words.json',
      JSON.stringify(wordCount, null, 2)
    );
  });
};

program.parse(process.argv);
if (program.args.length) {
  const text = program.args[0];
  parse(text);
} else {
  (async () => {
    for await (const line of process.stdin.pipe(new transform.Lines())) {
      if (line.startsWith('http')) {
        continue;
      }
      parse(line);
    }
  })();
}
