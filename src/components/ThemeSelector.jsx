import React from "react";

const ThemeSelector = ({ onSelectTheme }) => {
  const themes = ["animals", "funDay", "professions"];

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
