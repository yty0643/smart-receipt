import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { ITranItem, mouseEnter, mouseLeave } from '../../features/tran_list/tran_list_slice';
import styles from './bar.module.css';

const Bar = ({ item, max }: { item: ITranItem, max: number }) => {
    const dispatch = useDispatch();
    const tranList = useSelector((state: RootState) => (state.tranList.list));
    
    const onMouseEnter = (item: ITranItem) => {
        dispatch(mouseEnter(item.key));
    }
    const onMouseLeave = (item: ITranItem) => {
        dispatch(mouseLeave(item.key));
    }
    const height = Math.ceil(Number(item.tran_amt) / max * 100);
    return (
        <div
            className={`${styles.bar} ${item.hover && styles.hover}`}
            style={{
                backgroundColor: `${item.inout_type == "입금" ? "rgb(103, 143, 243)" : "rgb(231, 115, 115)"}`,
                height: `${height > 100 ? 100 : height}%`
            }}
            onMouseEnter={() => { onMouseEnter(item) }}
            onMouseLeave={() => { onMouseLeave(item) }}>
            <div className={`${styles.detail} ${item.hover && styles.hover}`}>
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