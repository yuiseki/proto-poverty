import Head from 'next/head';
import React, { useState } from 'react';
import tw, { css } from 'twin.macro';

const container = css`
  ${tw`m-4 p-4 rounded bg-yellow-500`}
`;

const Yuiseki: React.VFC = () => {
  const [clicked, setClicked] = useState(0);
  return (
    <>
      <Head>
        <title>yuiseki</title>
      </Head>
      <div css={container}>
        <h1>yuiseki</h1>
        <button
          onClick={() => {
            setClicked((prev) => {
              return prev + 1;
            });
          }}
        >
          click me!
        </button>
        <div>{clicked} times clicked.</div>
      </div>
    </>
  );
};

export default Yuiseki;
