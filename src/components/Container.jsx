import styled from "styled-components";

const ContainerBlock = styled.div`
    outline: 1px solid red;
    width: 293px;
    margin: 0px auto;
    display: block;

    @media screen and (min-width: 834px) {
        width: 634px;
    }
    @media screen and (min-width: 1440px) {
        width: 1140px;
        margin: 0px auto;
    }
`;

export default function Container({children}) {
    return <ContainerBlock>{children}</ContainerBlock>;
}