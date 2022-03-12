import React from "react";
import styled from "styled-components";

const Container = styled.div`
    background-color: #101e71;
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 1rem;
`;

const Title = styled.h2`
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
`;

function SleepScore() {
    return (
        <Container>
            <Title>YOUR SLEEP SCORE</Title>
        </Container>
    );
}

export default SleepScore;
