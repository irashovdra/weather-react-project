import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NewsCard from "./NewsCard";
import Container from "../Container";

const NewsContainer = styled.div`
 @media (max-width: 768px) {
    display:none;
  }
`;

const NewsTitle = styled.h2`
  color: #000;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  margin-bottom: 20px;
`;

const NewsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
`;

const NewsBtn = styled.button`
  border-radius: 10px;
  background: #ffb36c;
  border: none;
  display: inline-flex;
  padding: 10px 30px;
  justify-content: center;
  align-items: center;
  font-family: Montserrat;
  gap: 10px;
`;

const News = () => {
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const apiKey = "ca8726351add45fab675ebcca0097d3f";
  const query = "apple";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=${query}&sortBy=popularity&apiKey=${apiKey}`
        );
        const data = await response.json();
        setArticles(data.articles.filter((article) => article.urlToImage));
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [query]);

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  return (
    <Container>
      <NewsContainer>
        <NewsTitle>Interacting with our pets</NewsTitle>
        <NewsContent>
          <NewsCard articlesToShow={articles.slice(0, visibleCount)} />
        </NewsContent>
        {visibleCount < articles.length && (
          <ButtonContainer>
            <NewsBtn onClick={handleSeeMore}>See More</NewsBtn>
          </ButtonContainer>
        )}
      </NewsContainer>
    </Container>
  );
};

export default News;
