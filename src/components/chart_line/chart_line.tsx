import React, { createRef, RefObject, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { mouseEnter, mouseLeave } from '../../features/state_list/state_list_slice';
import styles from './chart_line.module.css';
import Line from './line';


const ChartLine = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => (state.theme.isActive))
    const tranList = useSelector((state: RootState) => (state.tranList.list));
    const hoverList = useSelector((state: RootState) => (state.stateList.hover));
    const hideList = useSelector((state: RootState) => (state.stateList.hide));
    const [heightArr, setHeightArr] = useState<number[]>([]);
    const [refArr, setRefArr] = useState<RefObject<HTMLDivElement>[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const onMouseEnter = (index: number) => {
        dispatch(mouseEnter(index));
    };

    const onMouseLeave = (index: number) => {
        dispatch(mouseLeave(index));
    };

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
                    ctx.moveTo(item.current.offsetLeft+4, item.current.offsetTop+4);
                } else {
                    ctx.lineTo(item.current.offsetLeft+4, item.current.offsetTop+4);
                }
            }
        })
        ctx.stroke();  
    };

    useEffect(() => {
        let max = 1;
        let min = Number.MAX_SAFE_INTEGER;
        tranList.map((item, index) => {
            if (!hideList[index]) {
                max = Math.max(item.after_balance_amt, max);
                min = Math.min(item.after_balance_amt, min);
            }
        });
        setHeightArr(Array(tranList.length).fill(0).map((item, index) => (Math.ceil((tranList[index].after_balance_amt - min) / (max - min) * 100 * 0.95) || 1)));
        setRefArr(Array(tranList.length).fill(null).map(() => (createRef())));
    }, [hideList]);

    useEffect(() => {
        if (refArr.length == 0 ) return;
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