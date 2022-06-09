import { faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setAccount } from '../../features/selected_acc/selected_acc_slice';
import AccountItem from '../account_item/account_item';
import styles from './account_list.module.css';

const Account_list = ({}) => {
    const theme = useSelector((state: RootState) => (state.theme.isActive));
    const dispatch = useDispatch();
    const [account_list] = useState<object[] | null>(JSON.parse(window.localStorage.getItem('SR_account_list') || "null"));
    const [focusIdx, setFocusIdx] = useState<number>(0);
    const conRef = useRef<HTMLDivElement>(null);

    const right = () => {
        if (!account_list) return;
        if (focusIdx == account_list.length - 1) {
            conRef.current?.scrollTo({
                left: 0,
                behavior: 'smooth',
            })
            setFocusIdx(0);
            return;
        }
        conRef.current?.scrollTo({
            left: Math.round(conRef.current?.scrollLeft)+288,
            behavior: 'smooth',
        })
        setFocusIdx((idx) => (idx + 1) % account_list.length);
    }

    const left = () => {
        if (!account_list) return;
        if (focusIdx == 0) {
            conRef.current?.scrollTo({
                left: 1000,
                behavior: 'smooth',
            })
            setFocusIdx(account_list.length-1);
            return;
        }
        conRef.current?.scrollTo({
            left: Math.round(conRef.current?.scrollLeft)-288,
            behavior: 'smooth',
        })
        setFocusIdx((idx) => {
            if (idx == 0) return account_list.length - 1
            return idx - 1;
        });
    }

    useEffect(() => {
        if (!account_list) return;
        dispatch(setAccount(account_list[focusIdx]));
    }, [focusIdx]);

    return (
        <div className={styles.section}>
            <button className={`${styles.btn} ${theme && styles.dark}`} onClick={left}>
                <FontAwesomeIcon icon={faCircleArrowLeft} />
            </button>
            <div className={styles.container} ref={conRef}>
                <div className={styles.cards}>
                    {account_list?.map((item, index) => (
                        <AccountItem
                            item={item}
                            index={index}
                            focusIdx={focusIdx}
                            key={index} />
                    ))}
                </div>
            </div>
            <button className={`${styles.btn} ${theme && styles.dark}`} onClick={right}>
                <FontAwesomeIcon icon={faCircleArrowRight} />
            </button>
        </div>
    );
};

export default Account_list;