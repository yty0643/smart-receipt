import React, { RefObject } from 'react';
import { ITranItem } from '../../features/transaction/transaction_slice';
import styles from './line.module.css'; 

interface IProps {
    theme: boolean,
    item: ITranItem,
    lineRef: RefObject<HTMLDivElement>,
    height: number,
    hover: boolean,
    hide: boolean,
    onMouseEnter: () => void,
    onMouseLeave: () => void
};

const Line = ({ theme, item, lineRef, height, hover, hide, onMouseEnter, onMouseLeave }: IProps) => {
    return (
        <div
            className={`${styles.line} ${theme && styles.dark} ${hide && styles.hide} ${hover && styles.hover}`}
            ref={lineRef}
            style={{ marginBottom: `${height}%` }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}>
            <div className={`${styles.detail} ${hover && styles.hover}`}>
                    <p>잔액</p>
                    <p>{item.after_balance_amt}</p>
            </div>
        </div>
    );
};

export default React.memo(Line);