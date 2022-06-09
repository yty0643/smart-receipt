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
        setMax(() => {
            let max = 0;
            tranList.map((item) => {
                if (!item.hide)
                    max = max < Number(item.tran_amt) ? Number(item.tran_amt) : max;
            })
            return max;
        })
    }, [tranList]);
    console.log(Math.ceil(Number(tranList[2].tran_amt) / max * 100));
    return (
        <div className={styles.section}>
            <div className={styles.chart}>
                {tranList && tranList.map(item => (
                    !item.hide && <Bar item={item} max={max} />
                ))}
            </div>
        </div>
    );
};

export default Chart;