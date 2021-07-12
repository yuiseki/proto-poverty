import * as fs from 'fs';
import crypto from 'crypto';
import program from 'commander';
program.version('0.0.1');
import Mecab from 'mecab-async';
import { transform } from '@moneyforward/stream-util';

const mecab = new Mecab();
mecab.command =
  'mecab -d /usr/lib/x86_64-linux-gnu/mecab/dic/mecab-ipadic-neologd';

const mecabParse = (text) => {
  return new Promise<any[]>((resolve) => {
    mecab.parse(text, (error, result) => {
      resolve(result);
    });
  });
};

function md5hex(str) {
  const md5 = crypto.createHash('md5');
  return md5.update(str, 'binary').digest('hex');
}

let wordNodes = [];
const wordEdges = [];
const parse = async (text) => {
  let readings = [];
  const result: any[] = await mecabParse(text);
  for (const token of result) {
    readings.push(token[0]);
  }
  readings = readings.filter((i) => {
    return i.length !== 1;
  });
  // add wordNodes
  for await (const reading of readings) {
    const words = wordNodes.map((i) => {
      return i.title;
    });
    if (words.indexOf(reading) > 0) {
      for (const node of wordNodes) {
        if (node.title === reading) {
          node.value += 1;
          Object.assign(wordNodes, node);
        }
      }
    } else {
      wordNodes.push({
        id: md5hex(reading),
        title: reading,
        label: reading,
        value: 1,
      });
    }
  }
  wordNodes = wordNodes.filter((i) => {
    return i.value > 1;
  });
  // add wordEdges
  for (const readingFrom of readings) {
    for (const readingTo of readings) {
      if (readingFrom === readingTo) {
        continue;
      }
      const edges = wordEdges.filter((e) => {
        (e.from === md5hex(readingFrom) && e.to === md5hex(readingTo)) ||
          (e.from === md5hex(readingTo) && e.to === md5hex(readingFrom));
      });
      if (edges.length !== 0) {
        continue;
      }
      // eslint-disable-next-line no-console
      console.log(readingFrom, readingTo);
      const edge = {
        from: md5hex(readingFrom),
        to: md5hex(readingTo),
      };
      wordEdges.push(edge);
    }
  }
};

const wordNet = {
  nodes: [],
  edges: [],
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
      await parse(line);
    }
    wordNet.nodes = wordNodes;
    wordNet.edges = wordEdges;
    // TODO 入力ファイルのある場所に置くべき
    fs.writeFileSync(
      './src/data/voice_single_mother_2020_08_word_net.json',
      JSON.stringify(wordNet, null, 2)
    );
  })();
}
