import Head from 'next/head';
import React from 'react';
import tw, { css } from 'twin.macro';

const container = css`
  ${tw`m-4 p-4 rounded bg-yellow-500`}
`;

const Yuiseki: React.VFC = () => {
  return (
    <>
      <Head>
        <title>貧困可視化プロトタイプ：ネットワーク</title>
      </Head>
      <div css={container}>
        <h1>yuiseki</h1>
      </div>
    </>
  );
};

export default Yuiseki;
