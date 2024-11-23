import "./App.css";
import Hero from "./components/Hero/Hero";
import Weather from "./components/Weather/Weather";
import Header from "./components/Header/Header";
import News from "./components/News/News";
import NewsCard from "./components/News/NewsCard";
function App() {
  return (
    <>
      <Header />
      <Hero></Hero>
      <Weather></Weather>
      <News />
    </>
  );
}

export default App;
