import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import AccountList from '../../components/account_list/account_list';
import BtnArrow from '../../components/btn_arrow/btn_arrow';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import styles from './account.module.css';

const Account = () => {
    const theme = useSelector((state: RootState) => (state.theme.isActive));
    const [accList, setAccList] = useState<object[]>(JSON.parse(window.localStorage.getItem('SR_account_list') || "[]"));
    const [newList, setNewList] = useState<{ [key: number]: any }>({});
    const [focusIdx, setFocusIdx] = useState<number>(1);
    const [isActive, setIsActive] = useState<boolean>(false);
    const divRef = useRef<HTMLDivElement>(null);

    const onClick = (value: number) => {
        if (isActive) return;
        setIsActive(true);
        setTimeout(() => { setIsActive(false) }, 600)
        setFocusIdx((idx) => (idx + value));
        let min = Number.MAX_SAFE_INTEGER;
        let max = Number.MIN_SAFE_INTEGER;
        setNewList((arr) => {
            const temp: { [key: number]: any } = { ...arr };
            Object.keys(temp).map((item) => {
                max = Math.max(Number(item), max);
                min = Math.min(Number(item), min);
            })
            if (value == 1) {
                temp[max + 1] = temp[min];
                divRef.current?.scrollTo({
                    top: Math.round(divRef.current?.scrollTop)+1000,
                    behavior: 'smooth',
                })
                setTimeout(() => { delete temp[min]; }, 500);
            } else {
                temp[min - 1] = temp[max];
                divRef.current?.scrollTo({
                    top: Math.round(divRef.current?.scrollTop)+150,
                    behavior: 'auto',
                })
                divRef.current?.scrollTo({
                    top: Math.round(divRef.current?.scrollTop)-150,
                    behavior: 'smooth',
                })
                setTimeout(() => { delete temp[max]; }, 500);
            }
            return temp;
        });
    };

    useEffect(() => {
        if (accList.length == 0) return;
        setNewList(() => {
            const temp:{[key:number]:any} = {...accList};
            const keys = Object.keys(temp).map(item=>Number(item));
            return temp;
        })
    }, [accList])

    useEffect(() => {
        if (!divRef.current) return;
        if (divRef.current.scrollTop != 0) return;
        divRef.current?.scrollTo({
            top: divRef.current.offsetHeight,
            behavior: 'auto',
        })
        divRef.current?.scrollTo({
            top: Math.floor(divRef.current.scrollTop/2),
            behavior: 'auto',
        })
        console.log(divRef.current.scrollTop)
    }, [newList]);

    return (
        <section className={`${styles.section} ${theme && styles.dark}`}>
            <div className={`${styles.box1} ${theme && styles.dark}`}>
                <BtnArrow icon={faAngleUp} onClick={() => { onClick(-1) }} />
                <AccountList focusIdx={focusIdx} accList={newList} divRef={divRef} />
                <BtnArrow icon={faAngleDown} onClick={() => { onClick(1) }} />
            </div>
            <div className={`${styles.box2} ${theme && styles.dark}`}>
                <p className={`${styles.title} ${theme && styles.dark}`}>금융결제원 API로 등록한 계좌들 중 하나를 선택하세요</p>
                <p className={`${styles.subTitle} ${theme && styles.dark}`}>금융결제원은 핀테크 인증 기업이 아닌 개인 개발자의 경우 실제 사용자 데이터가 아닌 테스트 데이터를 다루는 환경을 제공합니다.</p>
                <p className={`${styles.description} ${theme && styles.dark}`}>금융결제원 개발자 페이지를 통해 테스트 데이터를 사전 등록했습니다.</p>
            </div>
        </section>
    );
};

export default Account;