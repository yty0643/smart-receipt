import React, { useState } from 'react';
import styles from './bar.module.css';

export interface IBar{
    bgColor: string,
    height: number,
    balance: number,
    inout: string,
    content: string,
    amount: number,
    date: string,
    time: string,
    type: string,
};

const Bar = ({ item }: { item: IBar }) => {
    const [isHover, setIsHover] = useState<boolean>(false);
    return (
        <div className={styles.bar} style={{
            backgroundColor: `${item.bgColor}`,
            height: `${item.height}%`
        }}
            onMouseEnter={() => { setIsHover(true) }}
            onMouseLeave={() => { setIsHover(false) }}>
            <div className={`${styles.detail} ${isHover && styles.active}`}>
                <p className={styles.tag}>#{item.inout}</p>
                <p className={styles.title}>{item.content}</p>
                <div className={styles.box}>
                    <p>거래시간</p>
                    <p>{item.date} {item.time}</p>
                </div>
                <div className={styles.box}>
                    <p>거래구분</p>
                    <p>{item.type}</p>
                </div>
                <div className={styles.box}>
                    <p>거래금액</p>
                    <p>{item.amount}</p>
                </div>
                <div className={styles.box}>
                    <p>거래 후 잔액</p>
                    <p>{item.balance}</p>
                </div>
            </div>
        </div>
    );
};

export default Bar;