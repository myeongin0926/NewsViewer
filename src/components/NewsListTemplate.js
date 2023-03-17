import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import NewsItem from "./NewsItem";
import axios from "axios";
import { BiArrowToTop } from "react-icons/bi";

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
const Nullarticle = styled.div`
  position: relative;
  height: 100vh;
  backdrop-filter: blur(3px);
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  z-index: 11;
`;
const ToTop = styled.div`
  position: absolute;
  background-color: black;
  right: -30px;
  border-radius: 0 50% 50% 0;
  width: 50px;
  height: 50px;
  opacity: 0;
  visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 23px;
`;

const PageNavigation = styled.div`
  padding: 0 30px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-radius: 30px;
  position: fixed;
  bottom: 30px;
  background-color: black;
  color: white;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    transition-delay: 0s;
    background-color: black;
    border-radius: 30px 0 0 30px;
    ${ToTop} {
      transition: 0.2s;

      opacity: 1;
      visibility: visible;
    }
  }
`;
const PageNumber = styled.span`
  margin-top: -5px;
  display: inline-block;
  height: 30px;
  line-height: 2;
  box-sizing: border-box;
  opacity: 0.4;
  transition: 0.1s;
  ${(props) =>
    props.currentPage &&
    css`
      opacity: 1;
      border-bottom: 1px solid white;
    `}
  &:hover {
    opacity: 1;
  }
`;

const NewsListTemplate = ({ category }) => {
  const [articles, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageNumberList, setPageNumberList] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      try {
        const query = category === "all" ? "" : `&category=${category}`;
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us${query}&apiKey=193130353ade4db18399285d60dd6cd5&pageSize=20&page=${page}`
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
  }, [category, page]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };
  const handleToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return <LoadingModal></LoadingModal>;
  }
  if (!articles) {
    return <Nullarticle>Article이 비어있음</Nullarticle>;
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
                currentPage={page === pageNumber}
              >
                {pageNumber}
              </PageNumber>
            );
          })}
          <ToTop className="totop" onClick={handleToTop}>
            <BiArrowToTop />
          </ToTop>
        </PageNavigation>
      </NewsTemplateBlock>
    </>
  );
};

export default NewsListTemplate;
