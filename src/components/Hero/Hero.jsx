import React, { useState, useCallback, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import SearchIcon from "../../img/svgs/search.svg";
import heroBackground from "../../img/heroBackground.png";
import loop from "../../img/svgs/loop.svg";
import cities from "../../top-1000-cities.json";
import { nanoid } from "nanoid";

const citiesNames = cities.map((item) => item.name).sort();

const Hero = ({ setLocation, proc, proc2 }) => {
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

  const [uniqueData, setUniqueData] = proc2;
  const [showDrop, setShowDrop] = useState(false);
  const [passedCities, setPassedCities] = useState(citiesNames);

  const day = currentDate.getDate();
  const suffix = ["th", "st", "nd", "rd"][
    day % 10 < 4 && (day % 100) - (day % 10) !== 10 ? day % 10 : 0
  ];

  const fetchCountry = useCallback(
    (city) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?id=524901&appid=c9400bae708c82b43bfc3a812d020418&q=${city}&units=metric`
      )
        .then((val) => val.json())
        .then((val) => {
          const doesExist = uniqueData.some((obj) => obj.city === city);
          const newData = {
            city: city,
            country: val.sys.country,
            temp: val.main.temp.toFixed(1),
          };

          if (!doesExist) {
            setUniqueData((prev) => [...prev, newData]);
          } else {
            setUniqueData((prev) =>
              prev.map((obj) => (obj.city === city ? newData : obj))
            );
          }
        });
    },
    [uniqueData, setUniqueData]
  );

  useEffect(() => {
    fetchCountry("London");
  }, [fetchCountry]);

  function drop(list) {
    const len = Math.min(4, passedCities.length);
    const rawList = passedCities.slice(0, len);
    if (len) {
      return rawList.map((city) => (
        <li
          onClick={(e) => {
            fetchCountry(city);
            proc((prev) => {
              if (!prev.includes(city)) {
                return [...prev, city];
              } else {
                return [...prev];
              }
            });
            e.target.closest("form").children[1].value = "";
          }}
          key={nanoid()}
        >
          <img src={loop} alt="search" />
          {city}
        </li>
      ));
    } else {
      return <li>No cities found</li>;
    }
  }

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
          {showDrop ? <SearchDrop>{drop(passedCities)}</SearchDrop> : null}
          <SearchInput
            type="text"
            name="location"
            placeholder="Search location..."
            onFocus={(e) => {
              setShowDrop(true);
              e.target.closest("input").style.borderRadius = "10px 0px 0px 0px";
            }}
            onBlur={(e) => {
              setTimeout(() => {
                setShowDrop(false);
                e.target.closest("input").style.borderRadius =
                  "10px 0px 0px 10px";
              }, 100);
            }}
            onInput={(e) => {
              const q = e.target.value;
              const tempArr = citiesNames.filter((city) =>
                city.toLocaleLowerCase().includes(q.toLocaleLowerCase())
              );
              setPassedCities(tempArr);
            }}
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
  background: url(${heroBackground}) no-repeat center;
  background-size: cover;

  @media (max-width: 1199px) {
    padding: 40px 0;
    height: 445px;
  }

  @media (max-width: 767px) {
    padding: 50px 0 100px;
    height: 345px;
  }
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
  font-family: "Montserrat";
  font-size: 20px;
  margin-bottom: 35px;
  animation: ${fadeIn} 1s ease-out;

  @media (min-width: 768px) {
    font-size: 30px;
    margin-bottom: 50px;
  }

  @media (min-width: 1200px) {
    font-size: 40px;
    margin-bottom: 80px;
  }
`;

const TextHero = styled.div`
  animation: ${fadeIn} 1.2s ease-out;
  font-weight: 500;
  line-height: normal;
  text-align: left;
  font-size: 10px;

  @media (min-width: 768px) {
    font-size: 14px;
  }

  @media (min-width: 1200px) {
    font-size: 24px;
    display: flex;
  }
`;

const Description = styled.p`
  color: #fff;
  font-family: "Montserrat";
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
  margin-right: 20px;
  width: 250px;

  @media (min-width: 768px) {
    font-size: 22px;
    width: 300px;
  }

  @media (min-width: 1200px) {
    font-size: 24px;
    width: 400px;
  }
`;

const VerticalLine = styled.div`
  width: 2px;
  height: 80px;
  background-color: #fff;

  @media (min-width: 768px) {
    height: 100px;
  }

  @media (min-width: 1200px) {
    height: 120px;
  }
`;

const Data = styled.p`
  color: #fff;
  font-family: "Montserrat";
  font-size: 18px;
  font-weight: 600;
  margin-left: 20px;

  @media (min-width: 768px) {
    font-size: 22px;
  }

  @media (min-width: 1200px) {
    font-size: 24px;
  }
`;

const SearchForm = styled.form`
  margin-top: 30px;
  display: flex;
  align-items: center;
  position: relative;

  @media (min-width: 768px) {
    margin-top: 30px;
  }
`;

const SearchInput = styled.input`
  width: 153px;
  height: 15px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 10.4px;
  font-size: 6px;
  border: none;
  &::placeholder {
    color: #878787;
    font-size: 6px;
    font-family: "Montserrat";
    font-weight: 500;
    line-height: normal;
  }
  &:focus,
  &:active {
    outline: none;
  }
  @media screen and (min-width: 768px) {
    width: 373px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    padding-top: 8px;
    padding-bottom: 6.6px;
    padding-left: 19px;
    font-size: 10px;
    &::placeholder {
      font-size: 10px;
    }
  }
  @media screen and (min-width: 1200px) {
    width: 625px;
    height: 40px;
    border-radius: 10px 0px 0px 10px;
    background: rgb(217, 217, 217);
    border: none;
    padding: 0px 10px;
    font-size: 16px;
    &::placeholder {
      font-size: 14px;
    }
  }
`;

const SearchButton = styled.button`
  background: #ffb36c;
  width: 16px;
  height: 23px;
  border: none;
  outline: none;
  margin-left: 2px;
  border-radius: 0 5px 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  & img {
    width: 9px;
  }

  @media (min-width: 768px) {
    width: 29.4px;
    height: 29px;
    border-radius: 0 10px 10px 0;

    & img {
      width: 16px;
    }
  }

  @media (min-width: 1200px) {
    width: 50px;
    height: 40px;
    border-radius: 0px 10px 10px 0px;
    border: none;
    background: rgb(255, 179, 108);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    & img {
      width: 25px;
    }
  }
`;

const SearchDrop = styled.ul`
  margin: 0;
  padding: 0;
  position: absolute;
  top: 100%;
  left: 0;
  width: calc(100% - 50px);
  background-color: #eaeaea;
  z-index: 99;
  border-radius: 0px 0px 10px 10px;

  li {
    height: 45px;
    width: 100%;
    display: flex;
    padding: 0px 15px;
    box-sizing: border-box;
    justify-content: left;
    align-items: center;
    color: #2b2b2b;
    font-weight: bold;
    user-select: none;
    cursor: pointer;

    &:hover {
      background-color: #d7d7d7;
      border-radius: 10px;
    }

    img {
      width: 18px;
      height: 18px;
      margin-right: 10px;
    }
  }

  @media (max-width: 767px) {
    width: 100%;
    li {
      height: 35px;
      font-size: 12px;
      padding: 0px 10px;

      img {
        width: 14px;
        height: 14px;
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1199px) {
    width: calc(100% - 30px);
    li {
      height: 40px;
      font-size: 14px;
      padding: 0px 12px;

      img {
        width: 16px;
        height: 16px;
      }
    }
  }
`;
