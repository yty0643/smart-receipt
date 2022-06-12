import React from 'react';
import { ITranItem } from '../../features/tran_list/tran_list_slice';
import styles from './bar.module.css';

const Bar = ({ theme, item, height, hover,hide, onMouseEnter, onMouseLeave }: { theme:boolean, item: ITranItem, height: number, hover: boolean,hide: boolean, onMouseEnter: () => void, onMouseLeave: () => void }) => {

    return (
        <div
            className={`${styles.bar} ${theme && styles.dark} ${hide && styles.hide} ${hover && styles.hover}`}
            style={{
                backgroundColor: `${item.inout_type == "입금" ? "rgb(103, 143, 243)" : "rgb(231, 115, 115)"}`,
                height: `${height > 100 ? 100 : height}%`
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}>
            <div className={`${styles.detail} ${hover && styles.hover}`}>
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

export default React.memo(Bar);