import React, { RefObject, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAccount } from '../../features/selected/selected_slice';
import AccountItem from '../account_item/account_item';
import styles from './account_list.module.css';

const Account_list = ({ accList, focusIdx, divRef }: { accList: { [key: number]: any }, focusIdx: number, divRef:RefObject<HTMLDivElement>, }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (Object.keys(accList).length == 0) return;
        dispatch(setAccount(accList[focusIdx]));
    }, [focusIdx]);

    return (
        <div className={styles.container} ref={divRef}>
            <div className={styles.accountList} >
                {Object.entries(accList).sort(([a, s], [b, d]) => Number(a) - Number(b)).map((item) => {
                    return (
                        <AccountItem
                        item={item[1]}
                        index={Number(item[0])}
                        focusIdx={focusIdx}
                        key={item[0]} />
                    )
                })}
            </div>
        </div>
    );
};

export default Account_list;