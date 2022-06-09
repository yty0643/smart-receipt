import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../app/store";
import { RootState } from "../../app/store";
import { toggle } from '../../features/theme/theme_slice';
import styles from './theme_btn.module.css';

const ThemeBtn = () => {
  const theme = useSelector((state: RootState) => (state.theme.isActive));
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(toggle());
  }
  
  return <button className={styles.btn} onClick={onClick}>
    <div className={`${styles.sun} ${!theme && styles.active}`}>
      <FontAwesomeIcon icon={faSun} />
    </div>
    <div className={`${styles.moon} ${theme && styles.active}`}>
      <FontAwesomeIcon icon={faMoon} />
    </div>
  </button>;
};

export default ThemeBtn;
