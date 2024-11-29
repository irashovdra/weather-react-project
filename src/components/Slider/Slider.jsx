import { useEffect, useState } from "react";
import Container from "../Container";
import styled from "styled-components";
import left from "../../img/svgs/chevron-left.svg"
import right from "../../img/svgs/chevron-right.svg"

let list = [{largeImageURL: "./", id: 124},{largeImageURL: "./", id: 125},{largeImageURL: "./", id: 126},{largeImageURL: "./", id: 127},{largeImageURL: "./", id: 128}];
export default function Slider() {
    function getImages() {
        fetch("https://pixabay.com/api/?key=43085062-83502d00c5fb8aeb01fe37f91&min_width=6000&q=forest")
            .then(val => val.json())
            .then(val => {
                list = val.hits;
                setShow(true);
                updateList();
            });
    }
    function updateList() {
        const tempArr = [];
        for (let i = ((index + 18) % 20); i <= ((index + 22) % 20); i++){
            tempArr.push(list[i]);
        }
        setActualList(tempArr);
    }
    const [actualList, setActualList] = useState([]);
    const [index, setIndex] = useState(2);
    const [show, setShow] = useState(false);
    useEffect(() => {
        getImages();
        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight") {
                setIndex((prev) => prev + 1);
            }
            else if (e.key === "ArrowLeft") {
                setIndex((prev) => prev - 1);
            }
        });
    }, []);

    useEffect(() => {
        updateList(); 
    }, [index]);
    
    return <SliderBlock style={{marginTop: "80px"}}>
        <Container>
            <h2 style={{ marginBottom: "40px" }}>Beautiful nature</h2>
            <Arrow onClick={() => { setIndex(prev => prev - 1) }}><img src={left} alt="left" /></Arrow>
            {show ? <SliderList>
                {actualList.map(item => {
                    return <li key={item.id}><img src={item.largeImageURL} alt="component" /></li>
                })} 
            </SliderList> : <></>}
            <Arrow onClick={() => { setIndex(prev => prev + 1) }}><img src={right} alt="right" /></Arrow>
        </Container>
    </SliderBlock>
}

const SliderList = styled.ul`
  display: flex;
  position: relative;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 35px 100px;
  justify-content: space-between;
  align-items: center;
  height: 384px;
  li {
    width: 248px;
    height: 136px;
    transition: 300ms;
    &:nth-child(2n){
        width: 310px;
        height: 170px;
        position: absolute;
        left: 25%;
        transform: translateX(-25%);
        z-index: 2;
    }
    &:nth-child(4n){
        left: 75%;
        transform: translateX(-75%);
    }
    &:nth-child(3n){
        width: 384px;
        height: 211px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        z-index: 4;
    }
    img {
        width: 100%;
        height: 100%;
    }
  }
`;

const Arrow = styled.button`
    cursor: pointer;
    width: 40px;
    height: 40px;
    position: absolute;
    z-index: 99;
    top: calc(50% + 40px);
    transform: translateY(-50%);
    padding: 0;
    margin: 0;
    border: none;
    background-color: transparent;
    left: 0;
    &:last-child {
        left: calc(100% - 40px);
    }
    img {
        width: 100%;
        height: 100%;
    }
`;

const SliderBlock = styled.div`
    @media screen and (max-width: 1440px) {
        display: none;
    }  
`;