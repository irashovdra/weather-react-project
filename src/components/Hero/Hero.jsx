import React from "react";
import styled, { keyframes } from "styled-components";
import SearchIcon from "../../img/svgs/search.svg";
import heroBackground from "../../img/heroBackground.png";

const Hero = ({ setLocation }) => {
  const currentDate = new Date();
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = currentDate.getDate();
  const suffix = ["th", "st", "nd", "rd"][
    day % 10 < 4 && (day % 100) - (day % 10) !== 10 ? day % 10 : 0
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLocation(e.target.elements.location.value);
  };

  return (
    <HeroContainer>
      <Overlay>
        <Title>Weather dashboard</Title>
        <TextHero>
          <Description>
            Create your personal list of favorite cities and always be aware of
            the weather.
          </Description>
          <VerticalLine />
          <Data>
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            <br />
            {weekdays[currentDate.getDay()]}, {`${day}${suffix}`}
          </Data>
        </TextHero>
        <SearchForm onSubmit={handleFormSubmit}>
          <SearchInput
            type="text"
            name="location"
            placeholder="Search location..."
          />
          <SearchButton type="submit">
            <img src={SearchIcon} alt="Search icon" />
          </SearchButton>
        </SearchForm>
      </Overlay>
    </HeroContainer>
  );
};

export default Hero;


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
  background: url(${heroBackground}) no-repeat center center;
  background-size: cover;
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
  margin: 0;
  animation: ${fadeIn} 1s ease-out;
`;

const TextHero = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  animation: ${fadeIn} 1.2s ease-out;
`;

const Description = styled.p`
  color: #fff;
  font-family: Montserrat, sans-serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.5;
  margin-right: 20px;
  width: 300px;
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
  font-weight: 600;
  margin-left: 20px;
`;

const SearchForm = styled.form`
  margin-top: 30px;
  display: flex;
  align-items: center;
  
`;

const SearchInput = styled.input`
  width: 625px;
  height: 40px;
  border-radius: 10px 0 0 10px;
  background: #d9d9d9;
  border: none;
  padding: 0 10px;
  font-size: 16px;
`;

const SearchButton = styled.button`
  width: 50px;
  height: 40px;
  border-radius: 0 10px 10px 0;
  border: none;
  background: #ffb36c;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 20px;
    height: 20px;
  }
`;
