import styled from "styled-components"
import heroBackground from "../../img/heroBackground.png"
import loop from "../../img/svgs/loop.svg";
import SearchIcon from "../../img/svgs/search.svg";
import cities from "../../top-1000-cities.json";
import { nanoid } from "nanoid";
import { useState,useCallback,useEffect } from "react";

const citiesNames = [];
cities.map((item) => {
  citiesNames.push(item.name);
});
citiesNames.sort();



export default function Hero({ setLocation, proc, proc2 }) {
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

  const fetchCountry = useCallback((city) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=524901&appid=c9400bae708c82b43bfc3a812d020418&q=${city}&units=metric`
    )
      .then((val) => val.json())
      .then((val) => {
        let doesExist = false;
        const newList = uniqueData.map((obj) => {
          if (obj.city === city) {
            doesExist = true;
            return {
              city: city,
              country: val.sys.country,
              temp: val.main.temp.toFixed(1),
            };
          } else {
            return obj;
          }
        });
        if (!doesExist) {
          setUniqueData([
            ...uniqueData,
            {
              city: city,
              country: val.sys.country,
              temp: val.main.temp.toFixed(1),
            },
          ]);
        } else {
          setUniqueData(newList);
        }
      });
  });

  useEffect(() => {
    fetchCountry("London");
  }, []);

  function drop(list) {
    const len = Math.min(4, passedCities.length);
    const rawList = passedCities.splice(0, len);
    if (len) {
      return rawList.map((city) => {
        return (
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
        );
      });
    } else {
      return <li>No cities found</li>;
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <HeroBlock>
      <h2>Weather dashboard</h2>
      <div>
        <p>
          Create your personal list <br />
          of favorite cities and always <br /> be aware of the weather.
        </p>
        <span></span>
        <p>
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          <br />
          {weekdays[currentDate.getDay()]}, {`${day}${suffix}`}
        </p>
      </div>
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
            const tempArr = [];
            citiesNames.map((city) => {
              if (city.toLocaleLowerCase().includes(q.toLocaleLowerCase())) {
                tempArr.push(city);
              }
            });
            setPassedCities(tempArr);
          }}
        />
        <SearchButton type="submit">
          <img src={SearchIcon} alt="Search icon" />
        </SearchButton>
      </SearchForm>
    </HeroBlock>
  );
}

const HeroBlock = styled.section`
    box-sizing: border-box;
    color: white;
    font-family: Montserrat;
    background: url(${heroBackground}) no-repeat center;
    height: 345px;
    background-size: cover;
    padding: 50px 116px 100px;
    div {
      position: relative;
      padding-left: 25px;
      box-sizing: border-box;
      width: 161px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      gap: 20px;
      margin-left: auto;
      margin-right: auto;
      align-items: left;
      margin-bottom: 48px;
    }
    div > span {
      height: 80px;
      border: 1px solid #fff;
      position: absolute;
      left: 0;
      top: 0;
    }
    h2 {
      margin-bottom: 35px;
      font-size: 14px;
      font-weight: 600;
      text-align: center;
    }
    p {
      line-height: normal;
      font-size: 10px;
      font-weight: 500;
    }
    @media screen and (min-width: 834px) {
      padding: 40px 211px;
      h2 {
        font-size: 20px;
        margin-bottom: 40px;
      }
      p {
        font-size: 14px;
      }
      div {
        padding-right: 30px;
        width: 407px;
        padding-right: 71px;
        justify-content: space-between;
        padding-left: 0px;
        flex-direction: row;
      }
      div > span {
        position: relative;
      height: 110px;
    }
    }
    @media screen and (min-width: 1440px) {
      padding: 100px 323px;
      height: 595px;
      h2 {
        margin-bottom: 80px;
        font-size: 40px;
      }
      p {
          font-size: 24px;
      }
      div {
        width: 713px;
        padding-right: 116px;
      }
      div > span {
        height: 144px;
      }
    }
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  flex-shrink: 0;
  width: 174px;
  margin-left: auto;
  margin-right: auto;
  @media (min-width: 834px) {
    width: 402px;
    height: 27px;
    flex-shrink: 0;
    margin-top: 64px;
    margin-bottom: 0;
  }
  @media screen and (min-width: 1440px) {
    width: 625px;
    margin-left: auto;
    margin-right: auto;
    padding-right: 60px;

  }
`;

const SearchInput = styled.input`
  width: 174px;
  height: 10px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding-top: 4px;
  color: black;
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
  @media screen and (min-width: 834px) {
    width: 373px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    padding-top: 8px;
    padding-bottom: 6.6px;
    padding-left: 19px;
    background: #d9d9d9;
    font-size: 10px;
    &::placeholder {
      font-size: 10px;
    }
  }
  @media screen and (min-width: 1440px) {
    width: 625px;
    height: 42px;
    flex-shrink: 0; 
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
  width: 17px;
  height: 18px;
  flex-shrink: 0;
  border: none;
  outline: none;
  border-radius: 0 10px 10px 0;
  box-sizing: border-box;
  padding: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  & img {
    width: 9px;
  }

  @media (min-width: 834px) {
    width: 29.4px;
    height: 25px;
    border-radius: 0 10px 10px 0;

    & img {
      width: 16px;
    }
  }

  @media (min-width: 1440px) {
    width: 50px;
    height: 41px;
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
  top: 127%;
  left: 0;
  width: 645px;
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
  @media screen and (max-width: 1440px) {
    width: 372px;
    top: 95%;
    font-size: smaller;
  }
  @media screen and (max-width: 834px) {
    width: 157px;
    font-size: xx-small;
    li {
      height: 20px;
      padding: 0px 10px;
    img {
      width: 10px;
      height: 10px;

    }}
  }
`;