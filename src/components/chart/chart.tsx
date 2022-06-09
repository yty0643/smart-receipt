import React from 'react';
import Bar, { IBar } from './bar';
import styles from './chart.module.css';

const Chart = ({ chartData }: { chartData: IBar[] }) => {
    return (
        <div className={styles.chart}>
            {chartData && chartData.map(item => (
                <Bar item={item} />
            ))}
        </div>
    );
};

export default Chart;