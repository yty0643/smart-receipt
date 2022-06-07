import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import styles from './logo_btn.module.css';
const LogoBtn = () => {
  return (
    <div>
      <button className={styles.btn}>
      <div className={styles.icon}>
        <FontAwesomeIcon icon={faReceipt} />
      </div>
      </button>
      <p>smart-receipt</p>
    </div>
  );
};

export default LogoBtn;
