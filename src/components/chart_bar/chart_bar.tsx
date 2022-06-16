import React, { useEffect } from 'react';
import { IProps } from '../../sections/chart/chart';
import Bar from './bar';
import styles from './chart_bar.module.css';

const ChartBar = ({ theme, tranList, hideList, focusIdx, heightArr, maxMin, onMouseEnter, onMouseLeave }: IProps) => {

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
            <div className={styles.vertical}>
                <p>{(maxMin.max||1)}</p>
                <p>{(maxMin.max||1)/2}</p>
                <p>{0}</p>
            </div>
            <div className={styles.des}>pay/date</div>
            <div className={styles.horizontal}>
                <p>{maxMin.start}</p>
                <p>{maxMin.end}</p>
            </div>
        </div>
    );
};

export default React.memo(ChartBar);