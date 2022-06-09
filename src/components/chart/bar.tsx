import React, { useState } from 'react';
import { ITranItem } from '../../features/tran_list/tran_list_slice';
import styles from './bar.module.css';

const Bar = ({ item, max }: { item: ITranItem, max: number }) => {
    const [isHover, setIsHover] = useState<boolean>(false);

    return (
        <div className={styles.bar} style={{
            backgroundColor: `${item.inout_type == "입금" ? "rgb(103, 143, 243)" : "rgb(231, 115, 115)"}`,
            height: `${Math.ceil(Number(item.tran_amt) / max * 100)}%`
        }}
            onMouseEnter={() => { setIsHover(true) }}
            onMouseLeave={() => { setIsHover(false) }}>
            <div className={`${styles.detail} ${isHover && styles.active}`}>
                <p className={styles.tag}>#{item.inout_type}</p>
                <p className={styles.title}>{item.print_content}</p>
                <div className={styles.box}>
                    <p>거래시간</p>
                    <p>{item.tran_date} {item.tran_time}</p>
                </div>
                <div className={styles.box}>
                    <p>거래구분</p>
                    <p>{item.tran_type}</p>
                </div>
                <div className={styles.box}>
                    <p>거래금액</p>
                    <p>{item.tran_amt}</p>
                </div>
                <div className={styles.box}>
                    <p>거래 후 잔액</p>
                    <p>{item.after_balance_amt}</p>
                </div>
            </div>
        </div>
    );
};

export default Bar;