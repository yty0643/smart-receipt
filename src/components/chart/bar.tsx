import React from 'react';
import styles from './bar.module.css';

export interface IBar{
    bgColor: string,
    height: number,
}

const Bar = ({ item }: { item: IBar }) => {
    return (
        <div className={styles.bar} style={{
            backgroundColor: `${item.bgColor}`,
            height: `${item.height}%`
        }}></div>
    );
};

export default Bar;