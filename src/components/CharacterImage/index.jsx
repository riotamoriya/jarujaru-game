import * as React from "react";
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import './style.css';

const CharacterImage = () => {
  const data = useStaticQuery(graphql`
    query fetchImg {
      file(relativePath: { eq: "jarujaru.jpeg" }) {
        childImageSharp {
          gatsbyImageData(
            width: 800, 
            height: 800, 
            layout: CONSTRAINED 
            placeholder: BLURRED
            formats: [AUTO, WEBP]
          )
        }
      }
    }
  `);
  const image = getImage(data.file.childImageSharp.gatsbyImageData);
  
  return (
    <div className="character-image-container"> {/* 画像とボタンの間隔を調整 */}
      {image && 
        <GatsbyImage image={image} alt="長田" className="character-image"/>}
    </div>
  );
};


export default CharacterImage;
