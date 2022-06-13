import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { selectCategory } from '../../features/selected/selected_slice';
import styles from './chart_circle.module.css';
import Circle from './circle';

export interface ICategory{
    [key:string] : number[],
}

export interface IDetail{
    total_amt: number,
    tran_count: number,
    tran_contents: string[],
}

const ChartCircle = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => (state.theme.isActive));
    const tranList = useSelector((state: RootState) => (state.tranList.list));
    const hideList = useSelector((state: RootState) => (state.stateList.hide));
    const [category, setCategory] = useState<ICategory>();
    const [heightArr, setHeightArr] = useState<number[]>([]);
    const [focusIdx, setFocusIdx] = useState<number>(-1);
    const bgColor = [
        "rgb(146, 218, 118 )",
        "rgb(118, 218, 205 )",
        "rgb(118, 146, 218 )",
        "rgb(183, 118, 218 )",
        "rgb(218, 118, 153 )",
        "rgb(218, 183, 118 )"
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
                "카페": [],
                "편의점, 마트": [],
                "주유소": [],
                "음식점": [],
                "카카오페이": [],
                "기타": [],
            };
            tranList.map((item, index) => {
                if (!hideList[index]) {
                    if (strCmp(item.print_content, ['카페', '더벤티']))
                        temp['카페'].push(index);
                    else if (strCmp(item.print_content, ['세븐일레븐', '편의점', '마트']))
                        temp['편의점, 마트'].push(index);
                    else if (strCmp(item.print_content, ['주유소']))
                        temp['주유소'].push(index);
                    else if (strCmp(item.print_content, ['맥도날드', '닭', '국밥', '김밥']))
                        temp['음식점'].push(index);
                    else if (strCmp(item.print_content, ['카카오']))
                        temp['카카오페이'].push(index);
                    else
                        temp['기타'].push(index);
                }
            });
            return temp;
        })
    }, [hideList]);
    
    useEffect(() => {
        if (!category) return;
        let total = 0;
        Object.values(category).map((item) => (total += item.length));
        setHeightArr(Object.values(category).map((item) => (item.length / (total || 1))));
    }, [category]);

    useEffect(() => { 
        if (focusIdx == -1 || !category) return;
        dispatch(selectCategory(category[focusIdx]));
    }, [focusIdx]);

    return (
        <div className={styles.chart}>
            <svg className={styles.svg}>
                {heightArr.map((item, index) => {
                    if (index) start -= heightArr[index - 1];
                    if (item == 0) return;
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
            {focusIdx != -1 && category &&
                <div className={styles.category}>
                    <p className={styles.title}>{Object.keys(category)[focusIdx]}</p>
                    <p className={styles.percent}>{Math.floor(heightArr[focusIdx] * 100) + '%'}</p>
                </div>}
        </div>
    );
};

export default ChartCircle;