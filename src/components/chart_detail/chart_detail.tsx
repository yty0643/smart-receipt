import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Circle from '../chart_circle/circle';
import styles from './chart_detail.module.css';

export interface ICircle{
    [key:string] : number[],
}

const ChartDetail = () => {
    const selectedCategory = useSelector((state: RootState) => (state.selected.category));
    const tranList = useSelector((state: RootState) => (state.tranList.list));
    const [heightArr, setHeightArr] = useState<number[]>([]);
    const [category, setCategory] = useState<string[]>();
    const [indexList, setIndexList] = useState<number[]>();
    const [focusIdx, setFocusIdx] = useState<number>(-1);
    const bgColor = [
        "rgb(146, 218, 118 )",
        "rgb(118, 218, 205 )",
        "rgb(118, 146, 218 )",
        "rgb(183, 118, 218 )",
        "rgb(218, 118, 153 )",
        "rgb(218, 183, 118 )",
        "rgb(118, 146, 218 )",
        "rgb(183, 118, 218 )",
    ];
    let start = 0.25;

    useEffect(() => {
        if (Object.keys(selectedCategory).length == 0) return;
        Object.entries(selectedCategory).map((item) => {
            setIndexList(item[1]);
        });
    }, [selectedCategory]);

    useEffect(() => {
        if (!indexList) return;
        const temp: { [key: string]: number[] } = {};
        indexList.map(item => {
            if (`${tranList[item].print_content}` in temp)
                temp[`${tranList[item].print_content}`].push(item);
            else
                temp[`${tranList[item].print_content}`] = [item];
        })
        setCategory(Object.keys(temp));
        console.log(temp);
        setHeightArr(Object.values(temp).map((item, index) => (item.length / indexList.length)));
    }, [indexList]);
     
    // setDetailList(() => {
    //     const temp: IDetail[] = [];
    //     for (let i = 0; i < size; i++) {
    //         const detail: IDetail = {
    //             total_amt: 0,
    //             tran_count: 0,
    //             tran_contents: [],
    //         }
    //         Object.values(category)[i].map(item => {
    //             detail.total_amt += tranList[item].tran_amt;
    //             detail.tran_count++;
    //             detail.tran_contents.push(tranList[item].print_content);
    //         });
    //         temp.push(detail);
    //     };
    //     return temp;
    // });

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

export default ChartDetail;