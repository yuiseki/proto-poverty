/* eslint-disable no-console */
import * as fs from 'fs';
import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config();
const ENDPOINT = 'https://api.e-stat.go.jp/rest/3.0/app/json/getStatsData?';

(async () => {
  // https://www.e-stat.go.jp/stat-search/database?page=1&layout=dataset&statdisp_id=0000010210&metadata=1&data=1
  const params = new URLSearchParams({
    appId: process.env.ESTAT_APPID,
    statsDataId: '0000010210',
    cdCat01: '#J01107',
    cdArea: '13000',
  });
  const res = await fetch(ENDPOINT + params);
  const json = await res.json();
  console.log(json['GET_STATS_DATA']['STATISTICAL_DATA']['RESULT_INF']);
  console.log(json['GET_STATS_DATA']['STATISTICAL_DATA']['TABLE_INF']);
  //console.log(json['GET_STATS_DATA']['STATISTICAL_DATA']['CLASS_INF']['CLASS_OBJ'][0]);
  //console.log(json['GET_STATS_DATA']['STATISTICAL_DATA']['CLASS_INF']['CLASS_OBJ'][1]);
  //console.log(json['GET_STATS_DATA']['STATISTICAL_DATA']['CLASS_INF']['CLASS_OBJ'][2]);
  //console.log(json['GET_STATS_DATA']['STATISTICAL_DATA']['CLASS_INF']['CLASS_OBJ'][3]);
  //console.log(json['GET_STATS_DATA']['STATISTICAL_DATA']['DATA_INF']['VALUE']);
  const data = json['GET_STATS_DATA']['STATISTICAL_DATA']['DATA_INF']['VALUE'];
  const result = [];
  for (const datum of data) {
    const year = datum['@time'].substring(0, 4);
    const value = datum['$'];
    const row = {
      year: year + '年',
      value: parseFloat(value),
    };
    result.push(row);
  }
  console.log(result);
  fs.writeFileSync('./src/data/test.json', JSON.stringify(result, null, 2));
})();
