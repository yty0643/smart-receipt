import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import AccountList from '../../components/account_list/account_list';
import styles from './account.module.css';

const Account = () => {
    const theme = useSelector((state: RootState) => (state.theme.isActive));

    return (
        <section className={`${styles.section} ${theme && styles.dark}`}>
            <p className={`${styles.title} ${theme && styles.dark}`}>계좌 선택</p>
            <p className={`${styles.description} ${theme && styles.dark}`}>localStorage에 등록된 계좌 중 하나를 선택하세요.</p>
            <AccountList />
        </section>
    );
};

export default Account;