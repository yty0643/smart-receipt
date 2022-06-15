import React, { useEffect, useState } from 'react';
import { IProps } from '../../sections/chart/chart';
import Bar from './bar';
import styles from './chart_bar.module.css';

const ChartBar = ({ theme, tranList, hideList, focusIdx, heightArr, onMouseEnter, onMouseLeave }: IProps) => {
    return (
        <div className={styles.chart}>
            {tranList.map((item, index) => (
                <Bar
                    key={index}
                    theme={theme}
                    item={item}
                    height={heightArr[index]}
                    hover={index == focusIdx ? true : false}
                    hide={hideList[index]}
                    onMouseEnter={() => { onMouseEnter(index) }}
                    onMouseLeave={() => { onMouseLeave(index) }} />
            ))}
        </div>
    );
};

export default React.memo(ChartBar);