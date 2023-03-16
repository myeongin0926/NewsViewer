import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NewsItem from "./NewsItem";
import axios from "axios";

const NewsTemplateBlock = styled.div`
  width: 70%;
  margin: 200px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px;
  padding: 20px;
`;
const MorePage = styled.div`
  width: 50px;
  height: 50px;
  background-color: black;
`;
const LoadingModal = styled.div`
  position: relative;
  height: 100vh;
  backdrop-filter: blur(3px);
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 11;
`;

const NewsListTemplate = ({ category }) => {
  const [articles, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState(20);

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      try {
        const query = category === "all" ? "" : `&category=${category}`;
        console.log(query);
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us${query}&apiKey=782fce2be06a47c182e24698c8672cbb&pageSize=${pages}`
        );
        console.log(response.data.articles);
        setArticle(response.data.articles);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchdata();
  }, [category, pages]);

  if (loading) {
    return <LoadingModal></LoadingModal>;
  }
  if (!articles) {
    return <div>article 값이 없음</div>;
  }

  function BringMorePage() {
    const sumPages = pages + 10;
    setPages(sumPages);
  }

  return (
    <>
      <NewsTemplateBlock>
        {articles.map((article) => {
          return <NewsItem key={article.url} article={article} />;
        })}
      </NewsTemplateBlock>
      <MorePage
        onClick={() => {
          BringMorePage();
        }}
      />
    </>
  );
};

export default NewsListTemplate;
