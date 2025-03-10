import React, { useState } from "react";
import GameBoard from "./components/GameBoard";
import ThemeSelector from "./components/ThemeSelector";
import "./styles/App.css";
import Jogo from "/images/Jogo.png";

const App = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [level, setLevel] = useState(0); // 0, 1, 2 para níveis

  return (
    <div className="App">
      <img
        src={Jogo}
        alt="Logo do Jogo de Memória"
        style={{ width: "1000px", margin: "20px" }}
      />
      <ThemeSelector onSelectTheme={setSelectedTheme} />
      {selectedTheme && (
        <>
          <button onClick={() => setLevel(1)}>Nível 1</button>
          <button onClick={() => setLevel(2)}>Nível 2</button>
          <button onClick={() => setLevel(3)}>Nível 3</button>
          <GameBoard selectedTheme={selectedTheme} level={level} />
        </>
      )}
    </div>
  );
};

export default App;
