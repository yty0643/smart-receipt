import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import styles from './footer.module.css';

const Footer = () => {
    const theme = useSelector((state: RootState) => (state.theme.isActive));

    return (
        <footer className={`${styles.footer} ${theme && styles.dark}`}>
            <a className={`${styles.link} ${theme && styles.dark}`} href="https://github.com/yty0643/smart-receipt">Docs</a>
            <a className={`${styles.link} ${theme && styles.dark}`} href="https://github.com/yty0643">GitHub</a>
        </footer>
    );
};

export default Footer;