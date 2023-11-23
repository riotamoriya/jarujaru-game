import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import './style.css';

const CORRECT_PATTERN = [0,0,1,1,1,1,0,0];


const SoundButton = ({bottonText, setGameflow}) => {
  const data = useStaticQuery(graphql`
    query fetchResponsesSounds {
      Bingo: allFile(
        filter: {
          relativeDirectory: { eq: "specials" },
          extension: { eq: "mp3" },
          name: { eq: "bingo" }
        }
      ) {
        edges {
          node {
            publicURL
          }
        }
      }

      Out: allFile(
        filter: {
          relativeDirectory: { eq: "specials" },
          extension: { eq: "mp3" },
          name: { eq: "out" }
        }
      ) {
        edges {
          node {
            publicURL
          }
        }
      }

      Argentina: allFile(
        filter: {
          relativeDirectory: { eq: "specials" },
          extension: { eq: "mp3" },
          name: { eq: "Argentina" }
        }
      ) {
        edges {
          node {
            publicURL
          }
        }
      }

      Indonesia: allFile(
        filter: {
          relativeDirectory: { eq: "specials" },
          extension: { eq: "mp3" },
          name: { eq: "Indonesia" }
        }
      ) {
        edges {
          node {
            publicURL
          }
        }
      }
    }
  `);
  const [audioContext, setAudioContext] = useState(null);
  const [buffers, setBuffers] = useState({ Argentina: null, Indonesia: null, Bingo: null, Out: null });
  
  useEffect(() => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(context);
  
    const preloadAudio = async (url) => {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      return context.decodeAudioData(arrayBuffer);
    };
  
    const loadBuffers = async () => {
      const ArgentinaSound = await preloadAudio(data.Argentina.edges[0].node.publicURL);
      const IndonesiaSound = await preloadAudio(data.Indonesia.edges[0].node.publicURL);
      
      const BingoSound = await preloadAudio(data.Bingo.edges[0].node.publicURL);
      const OutSound = await preloadAudio(data.Out.edges[0].node.publicURL);


  
      setBuffers({ Argentina: ArgentinaSound, Indonesia: IndonesiaSound , Bingo: BingoSound, Out: OutSound});
    };
  
    loadBuffers();
  }, []);
  
  // サウンドを再生する関数
  const playSound = (buffer) => {
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
  };

  const [soundQueue, setSoundQueue] = useState([]);


  // サウンドをキューに追加する関数
  const addToQueue = (sound) => {
    setSoundQueue(prevQueue => [...prevQueue, sound]);
  };

  // Argentinaのサウンドを再生し、キューに追加
  const playArgentina = () => {
    playSound(buffers.Argentina);
    addToQueue(0);
  };

  // Indonesiaのサウンドを再生し、キューに追加
  const playIndonesia = () => {
    playSound(buffers.Indonesia);
    addToQueue(1);
  };
  
  



  // function matchPattern(arr1, arr2) {
  //   for (let i = 0; i < arr1.length; i++) {
  //     if (arr1[i] !== arr2[i]) {
  //       console.log(arr1)
  //       return 2;
  //     } 

  //     if ((arr1.length === arr2.length) && (arr1[i] === arr2[i])){
  //       console.log(arr1)
  //       return 1;
  //     }
  //   }
  // }
  
  function matchPattern(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
          return 2;
        } 
      }
      return -1;
    }

    else {
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
          return 2;
        } 
      }
      return 1;
    
    }
  }

  // soundQueueの変更を監視し、変更があったらコンソールに表示
  useEffect(() => {

    switch (matchPattern(soundQueue, CORRECT_PATTERN)){
      case 1:
        setSoundQueue([]);
        setGameflow(0);
        playSound(buffers.Bingo);
        break;

      case 2:
        setSoundQueue([]);
        setGameflow(0);
        playSound(buffers.Out);
        break;

      default:
    }


  }, [soundQueue]);



  return (
    <>
      <button onClick={playArgentina} className="buttonStyle">
        ゼンチン
      </button>
      <button onClick={playIndonesia} className="buttonStyle">
        ドネシア
      </button>
    </>
  );
};

export default SoundButton;
