import React from "react";
import styled from "styled-components";
import SleepScore from "./components/SleepScore/SleepScore";

const Container = styled.div`
        width: 600px;
        height: 800px;
        box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
        margin: 0 auto;
        background-color: #0a1153;
        color: #ffffff;
        font-family: "Roboto", sans-serif;
        padding-top: 1rem;
        display: flex;
        flex-direction: column;
        grid
    `;

const Title = styled.h1`
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
`;

function App() {
    return (
        <Container>
            <Title>SLEEP CALCULATOR</Title>
            <SleepScore />
        </Container>
    );
}

export default App;
