import Head from 'next/head';
import React from 'react';
import 'twin.macro';
import { TagCloud } from 'react-tagcloud';

import data from '../data/voice_single_mother_2020_08_words.json';

const Words = () => (
  <>
    <Head>
      <title>貧困可視化プロトタイプ：ワードクラウド</title>
    </Head>
    <div tw="mx-auto m-4 p-4 rounded bg-gray-600">
      <h1 tw='text-5xl text-white font-bold'>貧困可視化：ワードクラウド</h1>
      <h2 tw='text-3xl text-white'>
        <a href='https://note.com/single_mama_pj/n/n83bb1e08b706'>
          「新型コロナウイルス
          深刻化する母子世帯の暮らし―1800人の実態調査・速報」
        </a>
        の「回答者の声」を分析したものです
      </h2>
      <TagCloud shuffle minSize={25} maxSize={100} tags={data} />
    </div>
  </>
);

export default Words;

