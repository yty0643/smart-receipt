import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import styles from './footer.module.css';

const Footer = () => {
    const theme = useSelector((state: RootState) => (state.theme.isActive));

    return (
        <footer className={`${styles.footer} ${theme && styles.dark}`}>
            
        </footer>
    );
};

export default Footer;