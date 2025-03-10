
import React, { useState, useEffect } from "react";
import Card from "./Card";
import { themes } from "../data/themes";
import successSound from "/src/sounds/success_sound.mp3"; // Adicione o caminho para o seu arquivo de som de sucesso
import failSound from "/src/sounds/fail_sound.mp3"; // Adicione o caminho para o seu arquivo de som de falha

const GameBoard = ({ selectedTheme, level }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const totalPairs = level === 1 ? 6 : level === 2 ? 9 : 12;

  // Função para iniciar o jogo
  const startGame = () => {
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setTimer(0);
    setIsPlaying(true);

    const selectedCards = themes[selectedTheme].slice(0, totalPairs);
    const gameCards = [...selectedCards, ...selectedCards]
      .map((card, index) => ({
        ...card,
        flipped: false,
        matched: false,
        uniqueId: `${card.id}-${index}`,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(gameCards);
  };

  useEffect(() => {
    startGame();
  }, [level, selectedTheme]);

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else if (!isPlaying && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timer]);

  const handleCardClick = (clickedCard) => {
    if (flippedCards.length === 2 || clickedCard.flipped || clickedCard.matched)
      return;

    const newCards = cards.map((card) =>
      card.uniqueId === clickedCard.uniqueId ? { ...card, flipped: true } : card
    );

    setFlippedCards((prev) => [...prev, clickedCard]);
    setMoves((prev) => prev + 1); // Incrementa o contador de jogadas
    setCards(newCards);

    if (flippedCards.length === 1) {
      const firstCard = flippedCards[0];

      if (firstCard.img === clickedCard.img) {
        const updatedCards = newCards.map((card) =>
          card.img === firstCard.img || card.img === clickedCard.img
            ? { ...card, matched: true }
            : card
        );

        setCards(updatedCards);
        setMatchedPairs((prev) => prev + 1);

        // Toca som de sucesso
        const audio = new Audio(successSound);
        audio.play();

        setFlippedCards([]);
      } else {
        setTimeout(() => {
          const resetCards = newCards.map((card) => {
            if (
              card.uniqueId === firstCard.uniqueId ||
              card.uniqueId === clickedCard.uniqueId
            ) {
              return { ...card, flipped: false };
            }
            return card;
          });

          setCards(resetCards);

          // Toca som de falha
          const audio = new Audio(failSound);
          audio.play();

          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Nível: {level}</h2>
      <h3>Total de Jogadas: {moves}</h3>
      <h3>Tempo: {timer}s</h3>
      <button onClick={startGame}>Iniciar Jogo</button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${6}, 1fr)`,
          gap: "10px",
          width: "100%",
          maxWidth: "600px",
          margin: "20px 0",
        }}
      >
        {cards.map((card) => (
          <Card key={card.uniqueId} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
