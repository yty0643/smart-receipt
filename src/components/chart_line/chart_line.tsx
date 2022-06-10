import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import styles from './chart_line.module.css';
import Line from './line';

export interface ICoor{
    height: number,
    x: number,
    y: number,
};

const ChartLine = () => {
    const tranList = useSelector((state: RootState) => (state.tranList.list));
    const [max, setMax] = useState<number>(0);
    const [min, setMin] = useState<number>(Number.MAX_SAFE_INTEGER);
    const [heightArr, setHeightArr] = useState<number[]>();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!tranList) return;
        let tempMax = 0;
        let tempMin = Number.MAX_SAFE_INTEGER;
        tranList.map((item) => {
            if (!item.hide) {
                tempMax = Math.max(Number(item.after_balance_amt), tempMax);
                tempMin = Math.min(Number(item.after_balance_amt), tempMin);
            }
        })
        setMax(tempMax);
        setMin(tempMin);
    }, [tranList]);

    useEffect(() => {
        if (max == 0 || min == Number.MAX_SAFE_INTEGER) return;

        setHeightArr(() => {
            const temp: any[] = [];
            tranList.map((item) => {
                temp.push(Math.ceil(256 * (Math.ceil((Number(item.after_balance_amt) - min) / ((max - min) * 1.2) * 100) / 100)));
            });
            return temp;
        });
    }, [max, min]);

    useEffect(() => {
        if (!heightArr) return;
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio;
        canvasRef.current.width =  256 * dpr;
        canvasRef.current.height = 256 * dpr;
        ctx.scale(dpr, dpr);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgb(103, 143, 243)";
        let x = 1;
        ctx.beginPath();
        heightArr.map((item, index) => {
            if (!index) {
                ctx.moveTo(x+4, 256-item-4);
                x += 10;
            } else {
                ctx.lineTo(x+4, 256-item-4);
                x += 10;
            }
        });
        ctx.stroke();
    }, [heightArr]);


    return (
        <div className={styles.chart}>
            {heightArr && tranList.map((item, index) => (
                !item.hide && <Line item={item} height={heightArr[index]} />
            ))}
            <canvas className={styles.canvas} ref={canvasRef} width="256" height="256">
                
            </canvas>
        </div>
    );
};

export default ChartLine;