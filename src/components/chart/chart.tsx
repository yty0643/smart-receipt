import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Bar from './bar';
import styles from './chart.module.css';

const Chart = ({ }) => {
    const tranList = useSelector((state: RootState) => (state.tranList.list));
    const [max, setMax] = useState<number>(0);

    useEffect(() => { 
        if (!tranList) return;
        setMax((max) => {
            tranList.map((item) => {
                max = max < Number(item.tran_amt) ? Number(item.tran_amt) : max;
            })
            return max;
        })
    }, [tranList]);

    return (
        <div className={styles.section}>
            <div className={styles.chart}>
                {tranList && tranList.map(item => (
                    <Bar item={item} max={max}/>
                ))}
            </div>
        </div>
    );
};

export default Chart;