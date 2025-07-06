import React from "react";

const ThemeSelector = ({ onSelectTheme }) => {
  const themes = ["Desenho", "Film1", "Film2"];

  return (
    <div>
      {themes.map((theme) => (
        <button key={theme} onClick={() => onSelectTheme(theme)}>
          {theme}
        </button>
      ))}
    </div>
  );
};

export default ThemeSelector;
