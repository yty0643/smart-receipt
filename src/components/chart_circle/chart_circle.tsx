import React, { useEffect } from 'react';
import { IProps2 } from '../../sections/chart/chart';
import styles from './chart_circle.module.css';
import Circle from './circle';

const ChartCircle = ({ theme, cateList, category, bgColor, focusIdx, idx, heightArr, onMouseEnter }:IProps2) => {
    let start = 0.25;
    useEffect(() => { 
        if (idx == 1) {
            onMouseEnter(2, -1);
        }
    },[focusIdx])

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
                        hover={index == focusIdx ? true : false}
                        onMouseEnter={() => { onMouseEnter(idx, index) }}/>
                })}
            </svg>
            {focusIdx != -1 && category &&
                <div className={styles.description}>
                    <p className={styles.title}>{category[focusIdx]}</p>
                    <p className={styles.percent}>{heightArr.length != 0 && (Math.floor(heightArr[focusIdx] * 100)+ '%')}</p>
                </div>}
        </div>
    );
};

export default ChartCircle;