import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  width: 100px; // Ajuste o tamanho do cartão
  height: 100px; // Ajuste o tamanho do cartão
  background-color: #f0f0f0;
  display: inline-flex;
  justify-content: center;
  border: 2px solid #0e0101;
  align-items: center;
  margin: 0px;
  cursor: pointer;
  border-radius: 10px;
`;

const StyledImage = styled.img`
  width: 100%; // Configure a largura da imagem dentro do cartão
  height: 100%; // Configure a altura da imagem dentro do cartão
`;

const Card = ({ card, onClick }) => {
  return (
    <CardContainer onClick={() => onClick(card)}>
      {card.flipped ? <StyledImage src={card.img} alt="" /> : "?"}
    </CardContainer>
  );
};

export default Card;
