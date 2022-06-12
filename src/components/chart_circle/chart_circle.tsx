import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import styles from './chart_circle.module.css';
import Circle from './circle';

export interface ICategory{
    [key:string] : number,
}

const ChartCircle = () => {
    const tranList = useSelector((state: RootState) => (state.tranList.list));
    const hideList = useSelector((state: RootState) => (state.stateList.hide));
    const [category, setCategory] = useState<ICategory>();
    const [heightArr, setHeightArr] = useState<number[]>([]);
    const [focusIdx, setFocusIdx] = useState<number>(-1);
    const bgColor = [
        "rgba(146, 218, 118, 0.774)",
        "rgba(118, 218, 205, 0.774)",
        "rgba(118, 146, 218, 0.774)",
        "rgba(183, 118, 218, 0.774)",
        "rgba(218, 118, 153, 0.774)",
        "rgba(218, 183, 118, 0.774)"
    ];
    let start = 0.25;

    const strCmp: (str: string, arr: string[]) => boolean = (str, arr) => {
        for (let i = 0; i < arr.length; i++) {
            if (str.indexOf(arr[i]) >= 0)
                return true;
        }
        return false;
    };

    useEffect(() => {
        if (tranList.length == 0) return;
        setCategory(() => {
            const temp: ICategory = {
                "카페": 0,
                "편의점, 마트": 0,
                "주유소": 0,
                "음식점": 0,
                "카카오페이": 0,
                "기타": 0,
            };
            tranList.map((item, index) => {
                if (!hideList[index]) {
                    if (strCmp(item.print_content, ['카페', '더벤티']))
                        temp['카페']++;
                    else if (strCmp(item.print_content, ['세븐일레븐', '편의점', '마트']))
                        temp['편의점, 마트']++;
                    else if (strCmp(item.print_content, ['주유소']))
                        temp['주유소']++;
                    else if (strCmp(item.print_content, ['맥도날드', '닭', '국밥', '김밥']))
                        temp['음식점']++;
                    else if (strCmp(item.print_content, ['카카오']))
                        temp['카카오페이']++;
                    else
                        temp['기타']++;
                }
            });
            return temp;
        })
    }, [hideList]);
    
    useEffect(() => {
        if (!category) return;
        let total = 0;
        Object.values(category).map((item) => (total += item));
        setHeightArr(Object.values(category).map((item) => (item/ total)));
    }, [category]);
    
    return (
        <div className={styles.chart}>
            <svg className={styles.svg}>
                {heightArr.map((item, index) => {
                    if (index) start -= heightArr[index - 1];
                    return <Circle
                        key={index}
                        zIndex={index}
                        bgColor={bgColor[index]}
                        height={item}
                        start={start}
                        onMouseEnter={() => { setFocusIdx(index) }}
                        onMouseLeave={() => { setFocusIdx(-1) }} />
                })}
            </svg>
            <div className={styles.detail}>
                <p className={styles.title}>{focusIdx != -1 && category && Object.keys(category)[focusIdx]}</p>
                <p className={styles.percent}>{focusIdx != -1 && heightArr && Math.floor(heightArr[focusIdx]*100)+'%'}</p>
            </div>
        </div>
    );
};

export default ChartCircle;