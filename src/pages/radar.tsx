import Head from 'next/head';
import React from 'react';
import tw, { css } from 'twin.macro';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    subject: 'お金',
    A: 5,
    B: 5,
    fullMark: 10,
  },
  {
    subject: '時間',
    A: 8,
    B: 8,
    fullMark: 10,
  },
  {
    subject: 'スキル',
    A: 9,
    B: 9,
    fullMark: 10,
  },
  {
    subject: '健康',
    A: 4,
    B: 4,
    fullMark: 10,
  },
  {
    subject: '身体',
    A: 6,
    B: 6,
    fullMark: 10,
  },
  {
    subject: '環境',
    A: 10,
    B: 10,
    fullMark: 10,
  },
];

const container = css`
  ${tw`mx-auto m-4 p-4 rounded bg-gray-600`}
`;

const Recharts = () => (
  <>
    <Head>
      <title>貧困可視化プロトタイプ：Recharts</title>
    </Head>
    <div css={container}>
      <main>
        <h1 tw='text-5xl text-white font-bold'>貧困可視化：レーダーチャート</h1>
        <h2 tw='text-3xl text-white'></h2>
        <ResponsiveContainer width='95%' height={600}>
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis
              dataKey='subject'
              tick={{ fill: 'white', fontSize: 20 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 10]}
              type='number'
              tick={{ fill: 'white', fontSize: 20 }}
              tickCount={10}
            />
            <Radar
              name='Mike'
              dataKey='A'
              stroke='#8884d8'
              fill='#8884d8'
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </main>
    </div>
  </>
);

export default Recharts;
