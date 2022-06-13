import React from 'react';
import styles from './gauge_bar.module.css';

const GaugeBar = () => {
    return (
        <div className={styles.gaugeBar}>
            <div className={styles.box}>
                <p className={styles.title}>{`${`total`}`}</p>
                <p className={styles.description}>{`${'0000/0000'}`}</p>
            </div>
            <div className={styles.holder}>
                <div className={styles.bar} style={{width:'10%'}}></div>
            </div>
        </div>
    );
};

export default GaugeBar;