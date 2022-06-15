import React, { createRef, RefObject, useEffect, useRef, useState } from 'react';
import { IProps } from '../../sections/chart/chart';
import styles from './chart_line.module.css';
import Line from './line';

const ChartLine = ({ theme, tranList, hoverList, hideList, heightArr, onMouseEnter, onMouseLeave }: IProps) => {
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
                    hover={hoverList[index]}
                    hide={hideList[index]}
                    onMouseEnter={() => { onMouseEnter(index) }}
                    onMouseLeave={() => { onMouseLeave(index) }} />
            ))}
            <canvas className={styles.canvas} ref={canvasRef} width="256" height="256">
            </canvas>
        </div>
    );
};

export default ChartLine;