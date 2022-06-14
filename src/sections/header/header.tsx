import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import styles from './header.module.css';
import { toggle } from '../../features/theme/theme_slice';
import BtnTheme from '../../components/btn_theme/btn_theme';

const Header = () => {
    const theme = useSelector((state: RootState) => (state.theme.isActive));
    const dispatch = useDispatch();

    const onClick = () => {
      dispatch(toggle());
    }

    return (
        <header className={`${styles.header} ${theme && styles.dark}`}>
            <p className={`${styles.title} ${theme && styles.dark}`}>Smart Receipt</p>
            <BtnTheme before={faSun} after={faMoon} onClick={onClick} />
        </header>
    );
};

export default Header;