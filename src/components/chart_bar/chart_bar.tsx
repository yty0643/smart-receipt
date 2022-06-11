import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Bar from './bar';
import styles from './chart_bar.module.css';
import { mouseEnter, mouseLeave } from '../../features/state_list/state_list_slice';

const ChartBar = ({ }) => {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => (state.theme.isActive))
    const tranList = useSelector((state: RootState) => (state.tranList.list));
    const hoverList = useSelector((state: RootState) => (state.stateList.hover));
    const hideList = useSelector((state: RootState) => (state.stateList.hide));
    const [heightArr, setHeightArr] = useState<number[]>([]);

    const onMouseEnter = (index: number) => {
        dispatch(mouseEnter(index));
    };

    const onMouseLeave = (index: number) => {
        dispatch(mouseLeave(index));
    };

    useEffect(() => {
        let max = 1;
        let min = Number.MAX_SAFE_INTEGER;
        tranList.map((item, index) => {
            if (!hideList[index]) {
                max = Math.max(item.tran_amt, max);
                min = Math.min(item.tran_amt, min);
            }
        });
        setHeightArr(Array(tranList.length).fill(0).map((item, index) => (Math.ceil(tranList[index].tran_amt / max * 100))));
    }, [hideList]);
    
    return (
        <div className={styles.chart}>
            {tranList.map((item, index) => (
                !hideList[index] && <Bar
                    key={index}
                    item={item}
                    height={heightArr[index]}
                    hover={hoverList[index]}
                    onMouseEnter={() => { onMouseEnter(index) }}
                    onMouseLeave={() => { onMouseLeave(index) }} />
            ))}
        </div>
    );
};

export default ChartBar;