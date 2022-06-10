import React, { useEffect, useRef, useState } from 'react';
import { ITranItem } from '../../features/tran_list/tran_list_slice';
import styles from './line.module.css'; 

const Line = ({ item, height }: { item: ITranItem, height: number }) => {
    const lineRef = useRef<HTMLDivElement>(null);
    console.log(height);
    return (
        <div className={styles.line} ref={lineRef} style={{ marginBottom: `${height}px` }}>
            
        </div>
    );
};

export default Line;