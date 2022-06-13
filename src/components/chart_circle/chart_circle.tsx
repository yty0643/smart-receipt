import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { selectCategory } from '../../features/selected/selected_slice';
import styles from './chart_circle.module.css';
import Circle from './circle';

export interface ICircle{
    [key:string] : number[],
}

export interface IDetail{
    total_amt: number,
    tran_count: number,
    tran_contents: string[],
}

export interface IKeyword{
    [key:string] : string[],
}

const ChartCircle = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => (state.theme.isActive));
    const tranList = useSelector((state: RootState) => (state.tranList.list));
    const hideList = useSelector((state: RootState) => (state.stateList.hide));
    const [circleList, setCircleList] = useState<ICircle[]>([]);
    const [heightArr, setHeightArr] = useState<number[]>([]);
    const [focusIdx, setFocusIdx] = useState<number>(-1);
    const category = ['카페', '편의점, 마트', '주유소', '음식점', '카카오페이', '기타'];
    const keyword = [
        ['카페', '더벤티'],
        ['세븐일레븐', '편의점', '마트'],
        ['주유소'],
        ['맥도날드', '닭', '국밥', '김밥'],
        ['카카오'],
        [],
    ];
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
        if (arr.length == 0) return true;
        for (let i = 0; i < arr.length; i++) {
            if (str.indexOf(arr[i]) >= 0)
                return true;
        }
        return false;
    };

    useEffect(() => {
        if (tranList.length == 0) return;
        setCircleList(() => {
            const size = category.length;
            const temp: ICircle[] = Array(size).fill({}).map((item, index) => ({ [`${category[index]}`]: [] }));
            tranList.map((item, index) => {
                if (!hideList[index]) {
                    for (let i = 0; i < size; i++) {
                        if (strCmp(item.print_content, keyword[i])) {
                            temp[i][`${category[i]}`].push(index);
                            break;
                        }
                    }
                }
            });
            return temp;
        });
    }, [hideList]);
    
    useEffect(() => {
        if (!circleList) return;
        setHeightArr(Object.values(circleList).map((item, index) => (item[`${category[index]}`].length / (tranList.length || 1))));
    }, [circleList]);

    useEffect(() => {
        if (focusIdx == -1 || !circleList) return;
        dispatch(selectCategory(circleList[focusIdx]));
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
                <div className={styles.description}>
                    <p className={styles.title}>{category[focusIdx]}</p>
                    <p className={styles.percent}>{Math.floor(heightArr[focusIdx] * 100) + '%'}</p>
                </div>}
        </div>
    );
};

export default ChartCircle;