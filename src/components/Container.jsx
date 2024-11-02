import styled from "styled-components";

const ContainerBlock = styled.div`
    outline: 1ps solid red;
    width: 293px;
    margin: 50px auto;
    display: block;
    @media screen and (min-width: 768px) {
        width: 634px;
    }
    @media screen and (min-width: 1200px) {
        width: 1140px;
        margin: 60px auto;
    }
`;

export default function Container({children}) {
    return <ContainerBlock>{children}</ContainerBlock>;
}