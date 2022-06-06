import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";

const LogoBtn = () => {
  return (
    <button>
      <FontAwesomeIcon icon={faReceipt} />
    </button>
  );
};

export default LogoBtn;
