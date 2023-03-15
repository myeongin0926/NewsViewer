import React from "react";
import styled from "styled-components";
import { useState } from "react";
import imageReady from "../imageReady.jpeg";

const NewsItemBlock = styled.div`
  position: relative;
  width: 450px;
  height: 400px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  overflow: hidden;
  gap: 20px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  border-radius: 20px;
  text-align: center;

  .thumnail {
    overflow: hidden;
    border-radius: 12px 12px 0 0;
    height: 200px;
    img {
      width: 430px;
      height: 200px;
      object-fit: cover;
      transition: 0.2s;
      &:hover {
        transform: scale(1.05);
      }
    }
  }
  .content {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    h2 {
      font-size: 20px;
      font-weight: bold;
      word-break: keep-all;
      a {
        text-decoration: none;
        color: black;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    p {
      font-size: 17px;
      word-break: keep-all;
    }
  }
  .info {
    position: absolute;
    width: 200px;
    left: 0;
    right: 0;
    bottom: 5px;
    margin: 0 auto;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.5);
  }
`;

const NewsItem = ({ article }) => {
  const { title, description, url, urlToImage, publishedAt, source } = article;
  const [date] = useState(publishedAt.split("T"));
  return (
    <NewsItemBlock>
      {urlToImage ? (
        <div>
          <div className="thumnail">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <img src={urlToImage} alt="thumnail" />
            </a>
          </div>
          <div className="content">
            <h2>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {title}
              </a>
            </h2>
            <p>{description}</p>
          </div>
          <div className="info">
            {date[0]} {source.name}
          </div>
        </div>
      ) : (
        <div>
          <div className="thumnail">
            <img src={imageReady} alt="thumnail" />
          </div>
          <div className="content">
            <h2>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "30px" }}
              >
                {title}
              </a>
            </h2>
            <p>{description}</p>
          </div>
          <div className="info">
            {date[0]} {source.name}
          </div>
        </div>
      )}
    </NewsItemBlock>
  );
};

export default NewsItem;
