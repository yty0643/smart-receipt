import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import styles from './account_item.module.css';
import img from './chip.png';

const AccountItem = ({ item, index, focusIdx }: { item: any, index: number, focusIdx: number }) => {
    const theme = useSelector((state: RootState) => (state.theme.isActive));
    return (
        <div className={`${styles.card} ${index==focusIdx && styles.focus} ${theme && styles.dark}`}>
            <p className={styles.bank}>{item.bank_name}</p>
            <img className={styles.img} src={img} alt="chip" />
            <p className={styles.num}>{item.account_num_masked}</p>
            <p className={styles.name}>{item.account_holder_name}</p>
        </div>
    );
};

export default AccountItem;