import React, { useState } from 'react';
import styles from './btn_text.module.css';

const BtnText = ({ onClick, text }: { onClick: () => void, text: string }) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    
    return (
        <button
            className={styles.btn}
            onClick={onClick}
            onMouseEnter={() => { setIsActive(true) }}
            onMouseLeave={() => { setIsActive(false) }}>
            <div className={`${styles.cover} ${isActive && styles.active}`}/>
            <p className={styles.title}>{text}</p>
        </button>
    );
};

export default BtnText;