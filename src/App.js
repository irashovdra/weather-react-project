import "./App.css";
import { useState } from "react";
import Slider from "./components/Slider/Slider";
import Hero from "./components/Hero/Hero";
import Weather from "./components/Weather/Weather";
import Header from "./components/Header/Header";
import News from "./components/News/News";
import Footer from "./components/Footer/Footer";

function App() {
  const [city, setCity] = useState(["London"]);
  const [uniqueData, setUniqueData] = useState([]);
  return (
    <>
      {/* <Header /> */}
      <Hero proc={setCity} proc2={[uniqueData, setUniqueData]}></Hero>
      <Weather city={[city, setCity]} uniqueDataBlock={[uniqueData, setUniqueData]}></Weather>
      <News></News>
      <Slider></Slider>
      <Footer></Footer>
    </>
  );
}

export default App;
