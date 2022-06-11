import React, { RefObject, useEffect, useRef, useState } from 'react';
import { ITranItem } from '../../features/tran_list/tran_list_slice';
import styles from './line.module.css'; 

const Line = ({ item, height, lineRef, hide }: { item: ITranItem, height: number, lineRef: RefObject<HTMLDivElement>, hide: boolean }) => {

    return (
        <div className={`${styles.line} ${hide && styles.hide}`} ref={lineRef} style={{ marginBottom: `${height}px` }}>
            
        </div>
    );
};

export default React.memo(Line);