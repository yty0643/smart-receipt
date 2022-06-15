import React, { useEffect, useState } from 'react';
import { IProps } from '../../sections/chart/chart';
import Bar from './bar';
import styles from './chart_bar.module.css';

const ChartBar = ({ theme, tranList, hoverList, hideList, heightArr, onMouseEnter, onMouseLeave }: IProps) => {
    return (
        <div className={styles.chart}>
            {tranList.map((item, index) => (
                <Bar
                    key={index}
                    theme={theme}
                    item={item}
                    height={heightArr[index]}
                    hover={hoverList[index]}
                    hide={hideList[index]}
                    onMouseEnter={() => { onMouseEnter(index) }}
                    onMouseLeave={() => { onMouseLeave(index) }} />
            ))}
        </div>
    );
};

export default React.memo(ChartBar);