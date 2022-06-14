import React, { useEffect, useRef, useState } from 'react';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setAccount } from '../../features/selected/selected_slice';
import AccountItem from '../account_item/account_item';
import styles from './account_list.module.css';

const Account_list = ({ focusIdx }: { focusIdx: number }) => {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => (state.theme.isActive));
    const [account_list] = useState<object[] | null>(JSON.parse(window.localStorage.getItem('SR_account_list') || "null"));
    const conRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!account_list) return;
        dispatch(setAccount(account_list[focusIdx]));
    }, [focusIdx]);

    return (
        <div className={styles.container} ref={conRef}>
            <div className={styles.accountList}>
                {account_list?.map((item, index) => (
                    <AccountItem
                        item={item}
                        index={index}
                        focusIdx={focusIdx}
                        key={index} />
                ))}
            </div>
        </div>
    );
};

export default Account_list;