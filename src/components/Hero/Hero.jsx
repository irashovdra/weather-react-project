import React, { useState, useCallback, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import SearchIcon from "../../img/svgs/search.svg";
import heroBackground from "../../img/heroBackground.png";
import loop from "../../img/svgs/loop.svg";
import cities from "../../top-1000-cities.json";
import { nanoid } from "nanoid";

const citiesNames = [];
cities.map(item => {
    citiesNames.push(item.name);
})
citiesNames.sort();


const Hero = ({ setLocation, proc, proc2 }) => {
  const currentDate = new Date();
  const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December",];

  const [uniqueData, setUniqueData] = proc2;
  const [showDrop, setShowDrop] = useState(false);
  const [passedCities, setPassedCities] = useState(citiesNames);

  const day = currentDate.getDate();
  const suffix = ["th", "st", "nd", "rd"][
    day % 10 < 4 && (day % 100) - (day % 10) !== 10 ? day % 10 : 0
  ];
  
  const fetchCountry = useCallback((city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=524901&appid=c9400bae708c82b43bfc3a812d020418&q=${city}&units=metric`)
      .then(val => val.json())
      .then(val => {
                let doesExist = false;
                const newList = uniqueData.map(obj => {
                    if (obj.city === city) {
                        doesExist = true;
                        return {city: city, country: val.sys.country, temp: val.main.temp.toFixed(1)}
                    } else {
                        return obj;
                    }
                })
                if (!doesExist) {
                    setUniqueData([...uniqueData, { city: city, country: val.sys.country, temp: val.main.temp.toFixed(1) }])
                }
                else {
                    setUniqueData(newList);
                }
            })
    })
  useEffect(() => {
    fetchCountry("London");
  }, []);
  function drop(list) {
    const len = Math.min(4, passedCities.length);
    const rawList = passedCities.splice(0, len);
    if (len) {
      return rawList.map(city => {
        return <li onClick={(e) => {
          fetchCountry(city);
          proc((prev) => {
            if (!prev.includes(city))
            {
              return [...prev, city]
            } else {
              return [...prev]
            }
          }); e.target.closest("form").children[1].value = "";
        }} key={nanoid()}><img src={loop} alt="search" />{city}</li>
      });
    }
    else {
      return <li>No cities found</li>
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
          <Data>{months[currentDate.getMonth()]} {currentDate.getFullYear()}<br />{weekdays[currentDate.getDay()]}, {`${day}${suffix}`}</Data>
        </TextHero>
        <SearchForm onSubmit={handleFormSubmit}>
          {showDrop ? <SearchDrop>
            {drop(passedCities)}
          </SearchDrop> : <></> }
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
                e.target.closest("input").style.borderRadius = "10px 0px 0px 10px";
              }, 100);
            }}
            onInput={(e) => {
              const q = e.target.value;
              const tempArr = [];
              citiesNames.map(city => {
                if (city.toLocaleLowerCase().includes(q.toLocaleLowerCase())) {
                  tempArr.push(city);
                }
              })
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
      display: flex;
      justify-content: center;
      align-items: center;
      width: 18px;
      height: 18px;
      margin-right: 10px;
    }
  }
`;

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
  font-family: "Montserrat";
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
  font-family: "Montserrat";
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
  font-family: "Montserrat";
  font-size: 24px;
  font-weight: 600;
  margin-left: 20px;
`;

const SearchForm = styled.form`
  margin-top: 30px;
  display: flex;
  align-items: center;
  position: relative;
`;

const SearchInput = styled.input`
  width: 625px;
  height: 40px;
  border-radius: 10px 0 0 10px;
  background: #d9d9d9;
  border: none;
  padding: 0 10px;
  font-size: 16px;
  &:focus {
    outline: none;
  }
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
