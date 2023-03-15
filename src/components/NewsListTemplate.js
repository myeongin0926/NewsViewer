import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NewsItem from "./NewsItem";
import axios from "axios";

const NewsTemplateBlock = styled.div`
  width: 90%;
  margin: 400px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  padding: 20px;
`;

const NewsListTemplate = () => {
  const [articles, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines?country=kr&apiKey=782fce2be06a47c182e24698c8672cbb"
        );
        console.log(response.data.articles);
        setArticle(response.data.articles);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchdata();
  }, []);

  if (loading) {
    return <div>대기중</div>;
  }
  if (!articles) {
    return <div>article 값이 없음</div>;
  }

  return (
    <NewsTemplateBlock>
      {articles.map((article) => {
        return <NewsItem key={article.url} article={article} />;
      })}
    </NewsTemplateBlock>
  );
};

export default NewsListTemplate;
