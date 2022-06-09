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

    return (
        <div className={styles.chart}>
            <div className={styles.amount}>
                <p>{max}</p>
                <p>{max/2}</p>
                <p>{0}</p>
            </div>
            {tranList && tranList.map(item => (
                !item.hide && <Bar item={item} max={max} />
            ))}
            <div className={styles.date}>
                <p>{Number(tranList[0].tran_date)%10000/100}</p>
                <p>{Number(tranList[tranList.length-1].tran_date)%10000/100}</p>
            </div>
        </div>
    );
};

export default Chart;