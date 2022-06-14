import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import styles from './btn_theme.module.css';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const BtnTheme = ({ before, after, onClick }: { before: IconProp, after: IconProp, onClick: () => void }) => {
  const theme = useSelector((state: RootState) => (state.theme.isActive));
  
  return <button className={styles.btn} onClick={onClick}>
    <div className={`${styles.sun} ${!theme && styles.active}`}>
      <FontAwesomeIcon icon={before} />
    </div>
    <div className={`${styles.moon} ${theme && styles.active}`}>
      <FontAwesomeIcon icon={after} />
    </div>
  </button>;
};

export default BtnTheme;
