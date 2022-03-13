import React from "react";
import styled from "styled-components";

interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
}

const StyledButton = styled.button`
    background: none;
    border: 2px solid #ffffff;
    color: #ffffff;
    text-transform: uppercase;
    font-weight: bold;
    padding: 0.5rem;
    max-width: 300px;
    width: 60%;
    cursor: pointer;
    &:hover {
        background-color: #ffffff;
        color: #101e71;
    }
    &:active {
        background-color: rgba(255, 255, 255, 0.8);
    }
    &:disabled {
        color: #888888;
        border-color: #888888;
        background: none;
    }
`;

function Button({ label, onClick, disabled = false }: ButtonProps) {
    return (
        <StyledButton onClick={onClick} disabled={disabled}>
            {label}
        </StyledButton>
    );
}

export default Button;
