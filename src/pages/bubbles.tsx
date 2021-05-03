import Head from 'next/head';
import React from 'react';
import tw, { css } from 'twin.macro';
import {
  CartesianGrid,
  Cell,
  Label,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';

const data: Array<{
  age: number;
  income: number;
  satisfaction: number;
}> = [
  { age: 18, income: 100, satisfaction: 3 },
  { age: 21, income: 200, satisfaction: 6 },
  { age: 22, income: 300, satisfaction: 8 },
  { age: 25, income: 250, satisfaction: 6 },
  { age: 30, income: 1000, satisfaction: 9 },
  { age: 40, income: 300, satisfaction: 7 },
  { age: 50, income: 390, satisfaction: 1 },
  { age: 60, income: 1000, satisfaction: 10 },
  { age: 70, income: 300, satisfaction: 6 },
  { age: 80, income: 300, satisfaction: 7 },
];

const colors = ['red', 'green', 'blue', 'yellow', 'magenta', 'white', 'cyan'];

const container = css`
  ${tw`mx-auto m-4 p-4 rounded bg-gray-600`}
`;

const Bubbles = () => {
  return (
    <>
      <Head>
        <title>貧困可視化：バブルチャート</title>
      </Head>
      <div css={container}>
        <h1 tw='text-5xl text-white font-bold'>貧困可視化：バブルチャート</h1>
        <h2 tw='text-3xl text-white'></h2>
        <ResponsiveContainer width='95%' height={800}>
          <ScatterChart
            margin={{
              top: 100,
              right: 100,
              bottom: 60,
              left: 50,
            }}
          >
            <CartesianGrid />
            <XAxis tick={{ fill: 'white' }} type='number' dataKey='income'>
              <Label
                value='年収'
                position='bottom'
                offset={5}
                style={{ fontSize: '30px' }}
              />
            </XAxis>
            <YAxis tick={{ fill: 'white' }} type='number' dataKey='age'>
              <Label
                value='年齢'
                offset={-15}
                position='left'
                style={{ fontSize: '30px' }}
              />
            </YAxis>
            <ZAxis
              type='number'
              dataKey='satisfaction'
              range={[400, 5000]}
              scale='pow'
            />
            <Tooltip
              labelFormatter={() => {
                return '';
              }}
              cursor={{ strokeDasharray: '3 3' }}
            />
            <Scatter
              name='Satisfaction'
              data={data}
              fill='yellow'
              fillOpacity={0.5}
              shape='star'
            >
              {data.map((entry, index) => {
                return (
                  <Cell
                    key={`cell-${index}`}
                    fillOpacity={entry.satisfaction / 10}
                    fill={colors[index % colors.length]}
                  />
                );
              })}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Bubbles;
