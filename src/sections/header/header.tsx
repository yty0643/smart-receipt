import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import ThemeBtn from '../../components/theme_btn/theme_btn';
import styles from './header.module.css';

const Header = () => {
    const theme = useSelector((state: RootState) => (state.theme.isActive));

    return (
        <header className={`${styles.header} ${theme && styles.dark}`}>
            <p className={`${styles.title} ${theme && styles.dark}`}>Smart Receipt</p>
            <ThemeBtn />
        </header>
    );
};

export default Header;