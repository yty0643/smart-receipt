import React, { RefObject } from 'react';
import { ITranItem } from '../../features/tran_list/tran_list_slice';
import styles from './line.module.css'; 

const Line = ({ theme, item, lineRef, height, hover, hide, onMouseEnter, onMouseLeave }: { theme: boolean, item: ITranItem, lineRef: RefObject<HTMLDivElement>, height: number, hover: boolean, hide: boolean, onMouseEnter: () => void, onMouseLeave: () => void }) => {
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