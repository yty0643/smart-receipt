import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import AccountList from '../../components/account_list/account_list';
import BtnArrow from '../../components/btn_arrow/btn_arrow';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import styles from './account.module.css';

const Account = () => {
    const theme = useSelector((state: RootState) => (state.theme.isActive));
    const [account_list] = useState<object[] | null>(JSON.parse(window.localStorage.getItem('SR_account_list') || "null"));
    const [focusIdx, setFocusIdx] = useState<number>(0);

    const onClick = (value:number) => {
        setFocusIdx((idx) => {
            let temp = (idx + value);
            temp = temp < 0 ? account_list!.length-1 : temp;
            temp = temp > account_list!.length-1 ? 0 : temp;
            console.log(temp);
            return temp;
        });
    }
    // const right = () => {
    //     if (!account_list) return;
    //     if (focusIdx == account_list.length - 1) {
    //         conRef.current?.scrollTo({
    //             left: 0,
    //             behavior: 'smooth',
    //         })
    //         setFocusIdx(0);
    //         return;
    //     }
    //     conRef.current?.scrollTo({
    //         left: Math.round(conRef.current?.scrollLeft)+288,
    //         behavior: 'smooth',
    //     })
    //     setFocusIdx((idx) => (idx + 1) % account_list.length);
    // }

    // const left = () => {
    //     if (!account_list) return;
    //     if (focusIdx == 0) {
    //         conRef.current?.scrollTo({
    //             left: 1000,
    //             behavior: 'smooth',
    //         })
    //         setFocusIdx(account_list.length-1);
    //         return;
    //     }
    //     conRef.current?.scrollTo({
    //         left: Math.round(conRef.current?.scrollLeft)-288,
    //         behavior: 'smooth',
    //     })
    //     setFocusIdx((idx) => {
    //         if (idx == 0) return account_list.length - 1
    //         return idx - 1;
    //     });
    // }

    return (
        <section className={`${styles.section} ${theme && styles.dark}`}>
            <div className={`${styles.box1} ${theme && styles.dark}`}>
                <BtnArrow icon={faAngleUp} onClick={() => { onClick(-1) }} />
                <AccountList focusIdx={focusIdx}/>
                <BtnArrow icon={faAngleDown} onClick={() => { onClick(1) }} />
            </div>
            <div className={`${styles.box2} ${theme && styles.dark}`}>
                <p className={`${styles.title} ${theme && styles.dark}`}>계좌 선택</p>
                <p className={`${styles.description} ${theme && styles.dark}`}>localStorage에 등록된 계좌 중 하나를 선택하세요.</p>
            </div>
        </section>
    );
};

export default Account;