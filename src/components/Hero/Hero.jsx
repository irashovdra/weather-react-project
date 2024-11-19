import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import heroBack from "../../img/heroBackground.png";
import search from "../../img/svgs/search.svg";

const Hero = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const date = new Date();
      const optionsMonthYear = { month: "long", year: "numeric" };
      const optionsDay = { weekday: "long", day: "numeric" };

      const monthYear = date.toLocaleDateString("en-US", optionsMonthYear);
      const weekdayDay = date.toLocaleDateString("en-US", optionsDay);

      const day = date.getDate();
      const suffix =
        day % 10 === 1 && day !== 11
          ? "st"
          : day % 10 === 2 && day !== 12
          ? "nd"
          : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";

      setCurrentDate(
        `${monthYear}\n${weekdayDay.replace(/\d+/, `${day}${suffix}`)}`
      );
    };

    updateDate();
    const interval = setInterval(updateDate, 1000 * 60 * 60 * 24);
    return () => clearInterval(interval);
  }, []);

  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(`Searching for: ${searchValue}`);
  };

  return (
    <HeroContainer>
      <BackgroundImage src={heroBack} alt="Background" />
      <Overlay>
        <Title>Weather dashboard</Title>
        <TextHero>
          <Description>
            Create your personal list of favorite cities and always be aware of
            the weather
          </Description>
          <VerticalLine />
          <Data>{currentDate}</Data>
        </TextHero>
        <SearchForm onSubmit={handleSearchSubmit}>
          <SearchInput
            type="text"
            placeholder="Search location..."
            value={searchValue}
            onChange={handleSearchChange}
          />
          <SearchButton type="submit" />
        </SearchForm>
      </Overlay>
    </HeroContainer>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroContainer = styled.div`
  position: relative;
  text-align: center;
  color: white;
  width: 100%;
  height: 595px;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 595px;
  object-fit: cover;
  flex-shrink: 0;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Title = styled.h1`
  color: #fff;
  font-family: Montserrat, sans-serif;
  font-size: 40px;
  font-style: normal;
  margin: 0;
  animation: ${fadeIn} 1s ease-out;
`;

const TextHero = styled.div`
  display: flex;
  align-items: center;
  margin-top: 80px;
  margin-right: 130px;
  animation: ${fadeIn} 1.2s ease-out;
`;

const Description = styled.p`
  color: #fff;
  text-align: right;
  font-family: Montserrat, sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 345px;
  margin-right: 20px;
`;

const VerticalLine = styled.div`
  width: 2px;
  height: 120px;
  background-color: #fff;
`;

const Data = styled.p`
  color: #fff;
  font-family: Montserrat, sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-left: 20px;
  width: 200px;
`;

const SearchForm = styled.form`
  margin-top: 137px;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 625px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #d9d9d9;
  border: none;
  padding: 0 10px;
`;

const SearchButton = styled.button`
  width: 46px;
  height: 45px;
  flex-shrink: 0;
  border-radius: 0px 10px 10px 0px;
  border: none;
  background: #ffb36c;
  cursor: pointer;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    background-image: url(${search});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default Hero;
