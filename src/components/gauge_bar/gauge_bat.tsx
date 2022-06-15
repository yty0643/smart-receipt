import React from 'react';
import styles from './gauge_bar.module.css';

const GaugeBar = ({ title, value, total }:{title:string, value:number, total:number}) => {
    return (
        <div className={styles.gaugeBar}>
            <div className={styles.box}>
                <p className={styles.title}>{`${title||""}`}</p>
                <p className={styles.description}>{`${value||0} / ${total||0}`}</p>
            </div>
            <div className={styles.holder}>
                <div className={styles.bar} style={{width:`${(value/total*100)||0}%`}}></div>
            </div>
        </div>
    );
};

export default GaugeBar;