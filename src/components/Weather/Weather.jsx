import styled from "styled-components"
import Container from "../Container"

const Test = styled.div`
    width: 100%;
    height: 100px;
    background-color: green;
`

export default function Weather() {
    return <section>
        <Container>
            <Test></Test>
        </Container>
    </section>
}