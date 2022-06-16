import React, { createRef, RefObject, useEffect, useRef, useState } from 'react';
import { IProps } from '../../sections/chart/chart';
import styles from './chart_line.module.css';
import Line from './line';

const ChartLine = ({ theme, tranList, hideList, focusIdx, heightArr, maxMin, onMouseEnter, onMouseLeave }: IProps) => {
    const [refArr, setRefArr] = useState<RefObject<HTMLDivElement>[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const draw = () => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;
        const dpr = window.devicePixelRatio;
        canvasRef.current.width = 256 * dpr;
        canvasRef.current.height = 256 * dpr;
        ctx.scale(dpr, dpr);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgb(103, 143, 243)";
        ctx.beginPath();
        let able = true;
        refArr.map((item, index) => {
            if (item.current) {
                if (able) {
                    able = false;
                    ctx.moveTo(item.current.offsetLeft + 4, item.current.offsetTop + 4);
                } else {
                    ctx.lineTo(item.current.offsetLeft + 4, item.current.offsetTop + 4);
                }
            }
        })
        ctx.stroke();
    };

    useEffect(() => {
        setRefArr(Array(tranList.length).fill(null).map(() => (createRef())));
    }, [hideList]);

    useEffect(() => {
        if (refArr.length == 0) return;
        draw();
    }, [refArr]);

    return (
        <div className={styles.chart}>
            {tranList.map((item, index) => (
                !hideList[index] && <Line
                    key={index}
                    theme={theme}
                    item={item}
                    lineRef={refArr[index]}
                    height={heightArr[index]}
                    hover={index == focusIdx ? true : false}
                    hide={hideList[index]}
                    onMouseEnter={() => { onMouseEnter(index) }}
                    onMouseLeave={() => { onMouseLeave(index) }} />
            ))}
            <canvas className={styles.canvas} ref={canvasRef} width="256" height="256">
            </canvas>
            <div className={styles.vertical}>
                <p>{maxMin.max}</p>
                <p>{(maxMin.max+maxMin.min)/2}</p>
                <p>{maxMin.min}</p>
            </div>
            <div className={styles.des}>amount/date</div>
            <div className={styles.horizontal}>
                <p>{maxMin.start}</p>
                <p>{maxMin.end}</p>
            </div>
        </div>
    );
};

export default ChartLine;