import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const ThemeBtn = () => {
  return (
    <button>
      <FontAwesomeIcon icon={faSun} />
    </button>
  );
};

export default ThemeBtn;
