import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const CardContent = styled.div`
  width: 270px;
`;

const CardImg = styled.img`
  width: 100%;
  height: 208px; 
  object-fit: cover; 
  border-radius: 10px;
`;

const CardArticle = styled.h3`
  margin-top: 20px;
  color: #000;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const NewsCard = ({ articlesToShow = [] }) => {
  return (
    <CardContainer>
      {articlesToShow.map((article, index) => (
        <CardContent key={index} className="news-card">
          <CardImg src={article.urlToImage} alt={article.title} />
          <CardArticle className="news-title">{article.title}</CardArticle>
        </CardContent>
      ))}
    </CardContainer>
  );
};

export default NewsCard;
