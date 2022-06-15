import React, { useEffect } from 'react';
import styles from './circle.module.css';

interface IProps{
    zIndex: number,
    bgColor: string,
    height: number,
    start: number,
    hover: boolean,
    onMouseEnter: () => void,
};

const Circle = ({ zIndex, bgColor, height, start, hover, onMouseEnter }: IProps) => {

    const r = 110;
    return (
        <circle className={`${styles.circle} ${hover && styles.hover}`}
            cx="50%"
            cy="50%"
            r={r}
            fill="none"
            stroke={bgColor}
            strokeWidth="15"
            strokeDasharray={`${2 * Math.PI * r * height - 2}, ${2 * Math.PI * r * (1 - height) + 2}`}
            strokeDashoffset={2 * Math.PI * r * start}
            style={{ zIndex }}
            onMouseEnter={onMouseEnter}>
        </circle>
    );
};

export default Circle;