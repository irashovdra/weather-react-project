import "./App.css";
import Slider from "./components/Slider/Slider";
import Hero from "./components/Hero/Hero";
import Weather from "./components/Weather/Weather";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <Hero></Hero>
      <Weather></Weather>
      <Slider></Slider>
      <Footer></Footer>
    </>
  );
}

export default App;
