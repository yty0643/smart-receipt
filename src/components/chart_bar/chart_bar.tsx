import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Bar from './bar';
import styles from './chart_bar.module.css';

const ChartBar = ({ }) => {
    const tranList = useSelector((state: RootState) => (state.tranList.list));
    const [max, setMax] = useState<number>(0);
    const [start, setStart] = useState<number>(0);
    const [end, setEnd] = useState<number>(0);

    useEffect(() => {
        if (!tranList) return;
        setMax(() => {
            let max = 0;
            let check = true;
            tranList.map((item) => {
                if (!item.hide) {
                    if (check) {
                        setStart(Number(item.tran_date) % 10000 / 100);
                        check = false;
                    }
                    max = max < Number(item.tran_amt) ? Number(item.tran_amt) : max;
                    setEnd(Number(item.tran_date) % 10000 / 100);
                }
            })
            return max;
        });
    }, [tranList]);
    
    return (
        <div className={styles.chart}>
            <div className={styles.amount}>
                <p>{max}</p>
                <p>{max / 2}</p>
                <p>{0}</p>
            </div>
            {tranList && tranList.map(item => (
                !item.hide && <Bar item={item} max={max} />
            ))}
            <div className={styles.date}>
                <p>{start}</p>
                <p>{end}</p>
            </div>
        </div>
    );
};

export default ChartBar;