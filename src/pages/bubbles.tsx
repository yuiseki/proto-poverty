import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import 'twin.macro';
import {
  CartesianGrid,
  Cell,
  Label,
  //LabelList,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

import data from '../data/people/data.json';
const years = Object.keys(data);

//const colors = ['red', 'green', 'blue', 'yellow', 'magenta', 'white', 'cyan'];
const colors = ['yellow'];

const CustomizedTooltip = (props: TooltipProps<ValueType, NameType>) => {
  if (!props.active || !props.payload[0]) {
    return null;
  }
  const values = props.payload[0].payload;
  const newPayload = [
    {
      name: '年齢',
      value: values.age,
    },
    {
      name: '年収',
      value: values.income,
    },
    {
      name: 'ジェンダー',
      value: values.gender,
    },
    {
      name: '情報',
      value: values.information,
    },
  ];
  return (
    <div tw='bg-white p-1 w-52'>
      {newPayload.map((p) => {
        return (
          <div key={p.name} tw='m-1'>
            {p.name}: {p.value}
          </div>
        );
      })}
    </div>
  );
};

const Bubbles = () => {
  const [year, setYear] = useState(years[0]);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!auto) {
        return;
      }
      setYear((prevYear) => {
        if (years.indexOf(prevYear) === years.length - 1) {
          return years[0];
        } else {
          return years[years.indexOf(prevYear) + 1];
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [auto]);

  return (
    <>
      <Head>
        <title>貧困可視化プロトタイプ：スターチャート</title>
      </Head>
      <div tw="h-full flex flex-col m-4 p-4 rounded bg-gray-600">
        <div tw="h-64 w-full">
          <h1 tw='text-5xl text-white font-bold'>
            貧困可視化プロトタイプ：スターチャート
          </h1>
          <h2 tw='text-4xl text-white'>
            様々な人々の年齢・年収と生活の満足度を可視化した図です。
            星の大きさが生活の満足度です。 年ごとに個人の経済的な事情により、
            生活の満足度が移り変わっていく様子を知ることができます。
          </h2>
          <h2 tw='text-4xl text-white'>{year}年</h2>
          <label
            htmlFor='auto-checkbox'
            tw='h-8 mt-2 mb-2 block content-center'
          >
            <input
              id='auto-checkbox'
              type='checkbox'
              defaultChecked={auto}
              onClick={() => {
                setAuto(!auto);
              }}
              tw='w-8 h-6 mr-1'
            />
            <span tw='text-white text-3xl'>自動アニメーション</span>
          </label>
          <input
            type='range'
            min={years[0]}
            max={years[years.length - 1]}
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
            }}
            step='1'
            tw='w-full h-5'
          />
        </div>
        <div tw="h-full w-full">
          <ResponsiveContainer>
            <ScatterChart
              margin={{
                top: 20,
                right: 50,
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
              <YAxis
                tick={{ fill: 'white' }}
                domain={[0, 100]}
                type='number'
                dataKey='age'
              >
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
                content={<CustomizedTooltip />}
                cursor={{ strokeDasharray: '3 3' }}
              />
              <Scatter
                name='Satisfaction'
                data={data[year]}
                fill='yellow'
                fillOpacity={0.5}
                shape='star'
              >
                {/*
              <LabelList dataKey='id' style={{ pointerEvents: 'none' }} />;
              */}
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
      </div>
    </>
  );
};

export default Bubbles;
