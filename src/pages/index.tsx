/// <reference types="@emotion/react/types/css-prop" />
import tw, { css } from 'twin.macro';

const container = css`
  ${tw`mx-auto m-4 p-4 rounded bg-gray-800`}
`;

const list = css`
  li {
    color: white;
  }
  ${tw`list-disc list-inside`}
  ${tw`m-4 p-4`}
`;

const link = css`
  ${tw`text-xl underline text-blue-600 hover:text-blue-800 visited:text-purple-600`}
`;

export const Home = (): JSX.Element => (
  <div css={container}>
    <main>
      <h1 tw='text-5xl text-white font-bold'>貧困可視化プロトタイプ</h1>
      <ul css={list}>
        <li>
          <a css={link} href='/stars'>
            貧困可視化：スター
          </a>
        </li>
      </ul>
    </main>
  </div>
);

export default Home;
