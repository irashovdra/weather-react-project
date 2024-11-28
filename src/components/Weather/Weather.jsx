import styled from "styled-components"
import Container from "../Container"
import bin from "../../img/svgs/delete.svg"
import heart from "../../img/svgs/heart.svg"
import refresh from "../../img/svgs/refresh.svg"
import sun from "../../img/svgs/sun.svg"
import { useCallback, useEffect, useState } from "react"
import temperature from "../../img/svgs/temperature.svg"
import pressure from "../../img/svgs/pressure.svg"
import wind from "../../img/svgs/wind.svg"
import humidity from "../../img/svgs/humidity.svg"
import visibility from "../../img/svgs/visibility.svg"
import { nanoid } from "nanoid"
import { Line } from "react-chartjs-2"
import { Chart, CategoryScale, LineController, LineElement, PointElement, LinearScale } from "chart.js"

Chart.register(CategoryScale, LineController, LineElement, PointElement, LinearScale);

const CardList = styled.ul`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .optionButton {
        font-family: inherit;
        font-size: 9px;
        font-weight: 500;
        border-radius: 5px;
        background: #FFB36C;
        border: none;
        box-sizing: border-box;
        transition: 300ms;
        cursor: pointer;
        &:hover {
            background: #f3aa66;
            transform: scale(1.1);
        }
        &.clicked {
            transition: 150ms;
            transform: scale(0.95);
        }
    }
    > li {
        font-family: inherit;
        width: 293px;
        height: 392px;
        border-radius: 20px;
        background: #E8E8E8;
        ul:first-child {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin: 15px 15px 25px 15px;
            p {
                font-size: 12px;
                font-weight: 500;
            }
        }
        h2 {
            font-size: 20px;
            font-weight: 500;
            text-align: center;
            margin-bottom: 11px;
        }
        h3 {
            font-size: 24px;
            font-weight: 500;
            text-align: center;
            margin-bottom: 44px;
        }
        h4 {
            font-size: 12px;
            font-weight: 500;
            text-align: center;
        }
        > img {
            width: 83px;
            height: 83px;
            margin: 25px auto;
            display: block;

        }
        .options {
            display: flex;
            flex-direction: row;
            gap: 21px;
            margin-bottom: 12px;
            justify-content: center;
            li {
                width: 93px;
                height: 23px;
                button {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        div {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            img {
                width: 24px;
                height: 24px;
                transition: 300ms;
                user-select: none;
                cursor: pointer;
                &:hover {
                    transform: scale(1.1);
                }
                &.clicked {
                    transition: 150ms;
                    transform: scale(0.95);  
                }
            }
            
            button {
                width: 84px;
                height: 27px;
            }
        }
    }
    @media screen and (min-width: 834px) {
        gap: 110px;
        > li {
            width: 262px;
            height: 352px;
            ul:first-child {
                margin: 12px 25px;
            }
            h2{
                margin-bottom: 8px;
            }
            h3 {
                 margin-bottom: 32px;
            }
            div {
                button {
                    width: 81px;
                    height: 23px;
                }
            }
        }
    }
    @media screen and (min-width: 1440px) {
        gap: 90px;
        .optionButton {
            font-size: 10px;
            border-radius: 10px;
        }
        > li {
            width: 320px;
            height: 430px;
            ul:first-child {
                margin: 15px 30px;
                p {
                    font-size: 14px;
                }
            }
            h2 {
                font-size: 24px;
                margin-bottom: 10px;
            }
            .options {
                margin-bottom: 15px;
                gap: 25px;
                li {
                    width: 114px;
                    height: 28px;
                }
            }
            h4 {
                font-size: 14px;
            }
            > img {
                width: 120px;
                height: 120px;
                margin: 22px auto;
            }
            h3 {
                font-size: 32px;
                margin-bottom: 38px;
            }
            div {
                img {
                    width: 30px;
                    height: 30px;
                }
                button {
                    width: 100px;
                    height: 30px;
                }
            }
        }
    }
`;

const Wrapper = styled.div`
    gap: 80px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 35px 0px 50px;
    font-family: "Montserrat";
    @media screen and (min-width: 834px) {
        padding: 50px 0px;
    }
    @media screen and (min-width: 1440px) {
        padding: 60px 0px 80px;
    }
`;

const MoreData = styled.div`
    background: #E8E8E8;
    padding: 35px 43px;
    border-radius: 15px;
    box-sizing: border-box;
    font-family: inherit;
    ul {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 35px;
        li {
            width: 207px;
            height: 160px;
            background: #D9D9D9;
            border-radius: 10px;
            box-sizing: border-box;
            padding: 15px 0px;
            p {
                font-size: 10px;
                font-weight: 500;
                text-align: center;
                margin-bottom: 8px;
            }
            h3 {
                font-size: 14px;
                font-weight: 500;
                margin-bottom: 18px;
                text-align: center;
            }
            img {
                width: 60px;
                height: 60px;
                margin: auto;
                display: block;
            }
        }
    }
    @media screen and (min-width: 834px) {
        padding: 30px;
        ul {
            gap: 0px;
            row-gap: 30px;
            column-gap: 21px;
            li {
                width: 177px;
                height: 200px;
                user-select: none;
                p {
                    font-size: 12px;
                }
                h3 {
                    font-size: 16px;
                    margin-bottom: 37px;
                }
            }
        }
    }
    @media screen and (min-width: 1440px) {
        border-radius: 20px;
        padding: 40px 77px;
        ul {
            row-gap: 40px;
            column-gap: 58px;
            li {
                width: 290px;
                height: 217px;
                &:hover {
                    transition: 200ms;
                    transform: scale(1.04);
                }
                p {
                    font-size: 16px;
                    margin-bottom: 10px;
                }
                h3 {
                    font-size: 32px;
                    margin-bottom: 23px;
                }
                img {
                    width: 85px;
                    height: 85px;
                }
            }
        }
    }
`;

const WeeklyData = styled.div`
    border-radius: 15px;
    background: #E8E8E8;
    padding: 18px 25px 35px;
    box-sizing: border-box;
    h3 {
        margin-left: 18px;
        font-weight: 600;
        font-size: 10px;
        margin-bottom: 25px;
    }
    ul {
        text-align: center;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        column-gap: 43px;
        row-gap: 35px;
        li {
            display: flex;
            flex-direction: column;
            border-radius: 10px;
            background: #D9D9D9;
            width: 100px;
            height: 140px;
            transition: 300ms;
            &:hover {
                transform: scale(1.02);
            }
            img {
                width: 30px;
                height: 30px;
                display: block;
                margin: auto;
                margin-bottom: 7px;
            }
            p {
                font-size: 10px;
                font-weight: 500;
            }
            p:first-child {
                margin-top: 10px;
                margin-bottom: 20px;
            }
            span {
                display: flex;
                flex-direction: column;
                margin-bottom: 15px;
            }
        }
    }
    @media screen and (min-width: 834px) {
        padding: 20px 35px 35px;
        h3 {
            margin-left: 10px;
            margin-bottom: 17px;
            font-size: 12px;
        }
        ul {
            column-gap: 0px;
            row-gap: 0px;
            gap: 17px;
            li {
                position: relative;
                padding: 0px 16px;
                box-sizing: border-box;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                width: 564px;
                height: 40px;
                img {
                    width: 35px;
                    height: 35px;
                    margin: 0px;
                }
                span {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    flex-direction: row;
                    margin: 0px;
                    align-items: center;
                    gap: 15px;
                }
                p {
                    font-size: 14px;
                }
                p:first-child {
                    margin: 0px;
                }
            }
        }
    }
    @media screen and (min-width: 1440px) {
        padding: 26px 76px 42px;
        h3 {
            margin-bottom: 20px;
            font-size: 16px;
        }
        ul {
            gap: 10px;
            li {
                padding: 0px 50px;
                width: 986px;
                height: 47px;
            }
            img {
                width: 45px;
                height: 45px;
            }
            p {
                font-size: 16px;
            }
            span {
                gap: 13px;
            }
        }
    }
`;

const HourlyData = styled.div`
    border-radius: 15px;
    background: #E8E8E8;
    box-sizing: border-box;
    padding: 18px 25px 24px;
    h2 {
        font-size: 10px;
        font-weight: 600;
        margin-bottom: 16px;
        margin-left: 18px;
    }
    @media screen and (min-width: 834px) {
        padding: 20px 38px 26px;
        h2 {
            font-size: 12px;
            margin-left: 7px;
            margin-bottom: 28px;
        }
    }
    @media screen and (min-width: 1440px) {
        padding: 26px 40px 40px;
        h2 {
            font-size: 16px;
            margin-bottom: 20px;
            margin-left: 37px;
        }
    }
`;

export default function Weather({ city, uniqueDataBlock }) {
    const [cities, setCities] = city;
    const [uniqueData, setUniqueData] = uniqueDataBlock;
    const [moreData, setMoreData] = useState(false);
    const [weeklyForecast, setWeeklyForecast] = useState(false);
    const [hourlyForecast, setHourlyForecast] = useState(false);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [actualTime, setActualTime] = useState();
    const [weeklyData, setWeeklyData] = useState([]);
    const [hourlyData, setHourlyData] = useState({});

    const [weatherInfo, setWeatherInfo] = useState({});
    const fetchData = useCallback((city) => {
            fetch(`https://api.openweathermap.org/data/2.5/weather?id=524901&appid=c9400bae708c82b43bfc3a812d020418&q=${city}&units=metric`)
            .then(val => val.json())
            .then(val => {
                const data = val.main;
                setWeatherInfo({ temperature: data.temp.toFixed(1), feelsLike: data.feels_like.toFixed(1), minTemp: data.temp_min.toFixed(1), maxTemp: data.temp_max.toFixed(1), humidity: data.humidity, pressure: data.pressure, visibility: "Unlimited", windSpeed: val.wind.speed });
            }); 
    }, []);

    const fetchTotal = useCallback((city) => {
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=fb25167606234fa5ae1230349241811&q=${city}&days=8&aqi=no&alerts=no`)
            .then(val => val.json())
            .then(val => {
              const data = val.forecast.forecastday;
              const dataMap = data[0].hour;
              const tempArr = [];
              data.map((item) => {
                tempArr.push({
                  date: item.date_epoch,
                  max: item.day.maxtemp_c,
                  min: item.day.mintemp_c,
                  text: item.day.condition.text,
                  icon: item.day.condition.icon,
                });
                return false;
              });
              setWeeklyData(tempArr);
              const labels = [];
              const values = [];
              dataMap.map((item) => {
                labels.push(item.time.slice(-5));
                  values.push(item.temp_c);
                  return false;
              });
              setHourlyData({
                  labels: labels,
                  datasets: [
                      {
                          label: "Temperature",
                          data: values,
                          borderColor: "#FFB36C",
                          borderWidth: 3,
                          radius: 0
                      }
                  ]
              });
            })
    }, []);

    const WeeklyList =  weeklyData.map(item => {
        let time = new Date(item.date * 1000);
        time = String(time).slice(0, 3) + ", " + String(time).slice(4, 10);
        return (
          <li key={nanoid()}>
            <p>{time}</p>
            <span>
              <img src={item.icon} alt="weather icon" />
              <p className="temperature">{item.max}/{item.min}℃</p>
            </span>
            <p>{item.text}</p>
          </li>
        );
    })

    function deleteCard(city) {
        const newList = cities.filter(item => item !== city);
        setCities(newList);
        const newData = uniqueData.filter(item => item.city !== city);
        setUniqueData(newData);
    }

    function getTime() {
        const date = new Date();
        let mins = date.getMinutes();
        let hours = date.getHours();
        if (mins < 10) {
            mins = `0${mins}`;
        }
        if (hours === 0) {
            fetchData(cities[0]);
        }
        if (hours < 10) {
            hours = `0${hours}`;
        }
        setActualTime(`${hours}:${mins}`);
    }

    useEffect(() => {
        const date = new Date();
        getTime();
        fetchData(cities[0]);
        fetchTotal(cities[0]);
        setTimeout(() => {
            getTime();
            setInterval(() => {
                getTime();
            }, 60000);
        }, (60 - date.getSeconds()) * 1000);
    }, []);

    const cardsList = cities.map(city => {
        return <li key={city}>
                        <ul>
                            <li><p>{city}</p></li>
                            <li><p>{uniqueData.map(obj => {if(obj.city === city) {return obj.country}})}</p></li>
                        </ul>
                        <h2>{actualTime}</h2>
                        <ul className="options">
                            <li><button className="optionButton" onClick={(e) => { setHourlyForecast(prev => !prev); if(!hourlyForecast) fetchTotal(city); e.target.classList.add("clicked"); setTimeout(() => {e.target.classList.remove("clicked")}, 175)}}>Hourly forecast</button></li>
                            <li><button className="optionButton" onClick={(e) => { setWeeklyForecast(prev => !prev); if(!weeklyForecast) fetchTotal(city); e.target.classList.add("clicked"); setTimeout(() => {e.target.classList.remove("clicked")}, 175)}}>Weekly forecast</button></li>
                        </ul>
                        <h4>{(new Date()).getDate()}.{(new Date()).getMonth()+1}.{(new Date()).getFullYear()} | {daysOfWeek[(new Date()).getDay()]}</h4>
                        <img src={sun} alt="weather" />
                        <h3>{uniqueData.map(obj => {if(obj.city === city) {return obj.temp}})}℃</h3>
                        <div>
                            <img src={refresh} alt="refresh" onClick={(e) => { fetchData(city); fetchTotal(city); e.target.classList.add("clicked"); setTimeout(() => { e.target.classList.remove("clicked") }, 175); }}/>
                            <img src={heart} alt="heart" onClick={(e) => {e.target.classList.add("clicked");  setTimeout(() => {e.target.classList.remove("clicked")}, 175)}}/>
                            <button className="optionButton" onClick={(e) => { e.target.classList.add("clicked"); setTimeout(() => { e.target.classList.remove("clicked") }, 175); setMoreData((prev) => !prev); if(!moreData) fetchData(city)}}>See more</button>
                            <img src={bin} alt="bin" onClick={(e) => { deleteCard(city); e.target.classList.add("clicked"); setTimeout(() => { e.target.classList.remove("clicked") }, 175); setMoreData(false); setHourlyForecast(false);  setWeeklyForecast(false)}}/>
                        </div>
                    </li>
    })

    return <section>
        <Container>
            <Wrapper>
                <CardList>
                    {cardsList}
                </CardList>
                {moreData ? <MoreData>
                    <ul>
                        <li>
                            <p>Feels like</p>
                            <h3>{weatherInfo.feelsLike}℃</h3>
                            <img src={temperature} alt="temperature" />
                        </li>
                        <li>
                            <p>Min ℃</p>
                            <h3>{weatherInfo.minTemp}℃</h3>
                            <p>Max ℃</p>
                            <h3>{weatherInfo.maxTemp}℃</h3>
                        </li>
                        <li>
                            <p>Humidity</p>
                            <h3>{weatherInfo.humidity}%</h3>
                            <img src={humidity} alt="humidity" />
                        </li>
                        <li>
                            <p>Pressure</p>
                            <h3>{weatherInfo.pressure} Pa</h3>
                            <img src={pressure} alt="pressure" />
                        </li>
                        <li>
                            <p>Wind speed</p>
                            <h3>{weatherInfo.windSpeed} km/h</h3>
                            <img src={wind} alt="wind" />
                        </li>
                        <li>
                            <p>Visibility</p>
                            <h3>{weatherInfo.visibility}</h3>
                            <img src={visibility} alt="visibility" />
                        </li>
                    </ul>
                </MoreData> : <></>}
                {hourlyForecast ? <HourlyData>
                    <h2>Hourly forecast</h2>
                    <Line data={hourlyData}></Line>
                </HourlyData> : <></>}
                {weeklyForecast ? <WeeklyData>
                        <h3>Weekly forecast</h3>
                        <ul>
                            {WeeklyList}
                        </ul>
                </WeeklyData> : <></>}
            </Wrapper>
        </Container>
    </section>
}
