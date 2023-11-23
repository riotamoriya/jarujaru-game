import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import './style.css';


const bingo_probability = 0;



const SoundButton = ({bottonText, setGameflow}) => {
  const data = useStaticQuery(graphql`
    query fetchSounds {
      normals: allFile(filter: {relativeDirectory: {eq: "normals"}, extension: {eq: "mp3"}}) {
        edges {
          node {
            publicURL
          }
        }
      }
      specials: allFile(filter: {relativeDirectory: {eq: "specials"}, extension: {eq: "mp3"}}) {
        edges {
          node {
            publicURL
          }
        }
      }
    }
  `);

  const [audioContext, setAudioContext] = useState(null);
  const [buffers, setBuffers] = useState({ normals: [], specials: [] });

  useEffect(() => {
    // AudioContextを初期化
    const context = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(context);

    // オーディオファイルをプリロードする関数
    const preloadAudio = async (url) => {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      return context.decodeAudioData(arrayBuffer);
    };

    // 全オーディオファイルをプリロード
    const loadBuffers = async () => {
      const normalsPromises = data.normals.edges.map(edge => preloadAudio(edge.node.publicURL));
      const specialsPromises = data.specials.edges.map(edge => preloadAudio(edge.node.publicURL));

      const normalsBuffers = await Promise.all(normalsPromises);
      const specialsBuffers = await Promise.all(specialsPromises);

      setBuffers({ normals: normalsBuffers, specials: specialsBuffers });
    };

    loadBuffers();
  }, [data.normals.edges, data.specials.edges]);

  // 音声をランダムに選択して再生する関数
  const playRandomSound = (buffersArray) => {
    if (audioContext && buffersArray.length) {
      const source = audioContext.createBufferSource();
      const randomIndex = Math.floor(Math.random() * buffersArray.length);
      source.buffer = buffersArray[randomIndex];
      source.connect(audioContext.destination);
      source.start(0);
    }
  };

  // 音声を再生する関数
  const playSound = () => {
    const isSpecial = Math.random() < bingo_probability;
    if (isSpecial) {
      playRandomSound(buffers.specials);
    } else {
      playRandomSound(buffers.normals);
    }

    setGameflow(1);
  };

  return (
    <button onClick={playSound} className="buttonStyle">
      {bottonText}
    </button>
  );
};

export default SoundButton;
