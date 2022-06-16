import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import styles from './btn_text.module.css';

const BtnText = ({ onClick, text }: { onClick: () => void, text: string }) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const theme = useSelector((state: RootState) => (state.theme.isActive));
    
    return (
        <button
            className={styles.btn}
            onClick={onClick}
            onMouseEnter={() => { setIsActive(true) }}
            onMouseLeave={() => { setIsActive(false) }}>
            <div className={`${styles.cover} ${theme && styles.dark} ${isActive && styles.active}`}/>
            <p className={styles.title}>{text}</p>
        </button>
    );
};

export default BtnText;