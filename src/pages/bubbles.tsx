import Head from 'next/head';
import React, { useEffect, useState } from 'react';
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

import data from '../data/people/data.json';
const years = Object.keys(data);

//const colors = ['red', 'green', 'blue', 'yellow', 'magenta', 'white', 'cyan'];
const colors = ['yellow'];

const container = css`
  ${tw`mx-auto m-4 p-4 rounded bg-gray-600`}
`;

const Bubbles = () => {
  const [year, setYear] = useState(years[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setYear((prevYear) => {
        if (years.indexOf(prevYear) === years.length - 1) {
          return years[0];
        } else {
          return years[years.indexOf(prevYear) + 1];
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>貧困可視化：バブルチャート</title>
      </Head>
      <div css={container}>
        <h1 tw='text-5xl text-white font-bold'>貧困可視化：バブルチャート</h1>
        <h2 tw='text-3xl text-white'>{year}年</h2>
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
                offset={5}
                position='bottom'
                fill='white'
                style={{ fontSize: '30px' }}
              />
            </XAxis>
            <YAxis tick={{ fill: 'white' }} type='number' dataKey='age'>
              <Label
                value='年齢'
                offset={-15}
                position='left'
                fill='white'
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
              data={data[year]}
              fill='yellow'
              fillOpacity={0.5}
              shape='star'
            >
              {data[year].map((entry, index) => {
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
