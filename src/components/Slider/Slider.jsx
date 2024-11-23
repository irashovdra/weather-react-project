import { useState } from "react";
import styled from "styled-components";
import slider1 from "../../img/slider1.png";
import slider2 from "../../img/slider2.png";
import slider3 from "../../img/slider3.png";
import slider4 from "../../img/slider4.png";
import slider5 from "../../img/slider5.png";

const images = [slider1, slider2, slider3, slider4, slider5];

const SliderSection = () => {
  const [currentIndex, setCurrentIndex] = useState(2);

  const handleMouseOver = (index) => {
    setCurrentIndex(index);
  };

  return (
    <Section>
      <Title>Beautiful nature</Title>
      <Slider>
        {images.map((src, index) => (
          <Slide
            key={index}
            active={index === currentIndex}
            position={index - currentIndex}
            onMouseOver={() => handleMouseOver(index)}
          >
            <Image src={src} alt={`Slide ${index + 1}`} />
          </Slide>
        ))}
      </Slider>
    </Section>
  );
};

export default SliderSection;

// Styled Components
const Section = styled.div`
  text-align: center;
  padding: 20px;
`;

const Title = styled.h2`
  color: #000;
  font-family: Montserrat, sans-serif;
  font-size: 20px;
  font-weight: 500;
  line-height: normal;
`;

const Slider = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 250px;
  width: 100%;
  overflow: hidden;
`;

const Slide = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: ${({ position, active }) =>
    `translate(${position * 160}px, -50%) ${
      active ? "scale(1.2)" : "scale(0.8)"
    }`};
  z-index: ${({ active }) => (active ? 2 : 1)};
  opacity: ${({ active }) => (active ? 1 : 0.6)};
  transition: all 0.3s ease-in-out;
  filter: ${({ active }) => (active ? "none" : "blur(2px)")};
`;

const Image = styled.img`
  width: 384px;
  height: 211px;
`;
