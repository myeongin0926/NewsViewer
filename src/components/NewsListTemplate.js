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

const LoadingModal = styled.div`
  position: relative;
  height: 100vh;
  backdrop-filter: blur(3px);
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 11;
`;

const PageNavigation = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  transition: all 0.3s;
  box-sizing: border-box;
  border-radius: 30px;
  position: fixed;
  bottom: 30px;
  background-color: black;
  color: white;
  font-size: 18px;
  font-weight: bold;

  overflow: hidden;

  &:hover {
    width: 200px;
    & > .page {
      display: block;
    }
  }
`;
const PageNumber = styled.span`
  display: none;
  line-height: 2;
  box-sizing: border-box;
  opacity: 0.6;
  transition: 0.1s;
  &:hover {
    opacity: 1;
  }
`;

const NewsListTemplate = ({ category }) => {
  const [articles, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalListNumber, setTotalListNumber] = useState(1);
  const [pageNumberList, setPageNumberList] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      try {
        const query = category === "all" ? "" : `&category=${category}`;
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us${query}&apiKey=782fce2be06a47c182e24698c8672cbb&pageSize=20&page=${totalListNumber}`
        );

        setArticle(response.data.articles);
        const totalPages = Math.ceil(response.data.totalResults / 20);
        const pageNumber = Array.from(
          { length: totalPages },
          (_, index) => index + 1
        );
        setPageNumberList(pageNumber);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchdata();
  }, [category, totalListNumber]);

  const handlePageChange = (pageNumber) => {
    setTotalListNumber(pageNumber);
  };

  if (loading) {
    return <LoadingModal></LoadingModal>;
  }
  if (!articles) {
    return <div>article 값이 없음</div>;
  }

  return (
    <>
      <NewsTemplateBlock>
        {articles.map((article) => {
          return <NewsItem key={article.url} article={article} />;
        })}
        <PageNavigation>
          {pageNumberList.map((pageNumber) => {
            return (
              <PageNumber
                className="page"
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                style={{ cursor: "pointer" }}
              >
                {pageNumber}
              </PageNumber>
            );
          })}
        </PageNavigation>
      </NewsTemplateBlock>
    </>
  );
};

export default NewsListTemplate;
