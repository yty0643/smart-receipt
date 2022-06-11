import React, { createRef, RefObject, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import styles from './chart_line.module.css';
import Line from './line';


const ChartLine = () => {
    const tranList = useSelector((state: RootState) => (state.tranList.list));
    const [max, setMax] = useState<number>(0);
    const [min, setMin] = useState<number>(Number.MAX_SAFE_INTEGER);
    const [heightArr, setHeightArr] = useState<number[]>();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [refArr, setRefArr] = useState<RefObject<HTMLDivElement>[]>([]);

    const draw = () => {
        if (refArr.length == 0 || !refArr[0].current) return;
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
        tranList.map((item, index) => {
            if (item.hide) return;
            if (able) {
                able = false;
                ctx.moveTo(refArr[index].current!.offsetLeft+5, refArr[index].current!.offsetTop+5);
            } else {
                ctx.lineTo(refArr[index].current!.offsetLeft+5, refArr[index].current!.offsetTop+5);
            }
        });
        ctx.stroke();  
    };

    useEffect(() => {
        setRefArr(() => {
            const temp: RefObject<HTMLDivElement>[] = Array(30).fill(null).map(() => (createRef()));
            return temp;
        });
        console.log("refArr RESET!")
    }, []);

    useEffect(() => {
        if (!tranList) return;
        console.log(tranList);
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
        draw();
    }, [tranList]);

    useEffect(() => {
        if (max == 0 || min == Number.MAX_SAFE_INTEGER) return;
        console.log("H");
        setHeightArr(() => {
            const temp: any[] = [];
            tranList.map((item) => {
                temp.push(Math.ceil(256 * (Math.ceil((Number(item.after_balance_amt) - min) / ((max - min) * 1.2) * 100) / 100)));
            });
            return temp;
        });
    }, [max, min]);

    useEffect(() => { 
        // draw();
    },[heightArr])

    return (
        <div className={styles.chart}>
            {heightArr && tranList.map((item, index) => (
                <Line item={item} height={heightArr[index]} lineRef={refArr[index]} hide={item.hide} />
            ))}
            <canvas className={styles.canvas} ref={canvasRef} width="256" height="256">
            </canvas>
        </div>
    );
};

export default ChartLine;