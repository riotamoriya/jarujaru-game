import * as React from "react";

import { useState } from "react";
import CharacterImage from "../components/CharacterImage";
import VoiceBotton from '../components/VoiceBotton';
import PlayBotton from "../components/PlayBotton/";

const IndexPage = () => {

  const [ gameflow, setGameflow ] = useState(0);

  // console.log(gameflow);

  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', padding: '5vh 0' }}>
      {/* 画像を中央に配置 */}
      <CharacterImage />
      {/* ボタンを中央に配置 */}
      {
        gameflow === 0 ?  <VoiceBotton bottonText={"Start"} setGameflow={setGameflow}/> : <PlayBotton setGameflow={setGameflow}/>
       }
      

    </main>
  );
};

export default IndexPage;

export const Head = () => (
  <>
    <title>ジャルジャル・ゲーム</title>
    <meta name="description" content="ジャルジャル・ゲーム" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    {/* Open Graph / Facebook */}
    <meta property="og:title" content="ジャルジャル・ゲーム" />
    <meta property="og:description" content="ジャルジャル・ゲーム" />
    <meta property="og:image" content="https://riotamoriya.github.io/inumakirulet/inumaki.jpg" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://riotamoriya.github.io/inumakirulet/" />
    {/* Twitter */}
    <meta name="twitter:card" content="ジャルジャル・ゲーム" />
    <meta name="twitter:title" content="ジャルジャル・ゲーム" />
    <meta name="twitter:description" content="ジャルジャル・ゲーム" />
    <meta name="twitter:image" content="https://riotamoriya.github.io/inumakirulet/inumaki.jpg" />
  </>
);