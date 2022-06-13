import React, { useEffect } from 'react';
import styles from './circle.module.css';

const Circle = ({ zIndex, bgColor, height, start, onMouseEnter,onMouseLeave }: { zIndex: number, bgColor: string, height: number, start: number, onMouseEnter: () => void ,onMouseLeave: () => void }) => {

    const r = 110;
    return (
        <circle className={styles.circle}
            cx="50%"
            cy="50%"
            r={r}
            fill="none"
            stroke={bgColor}
            strokeWidth="15"
            strokeDasharray={`${2 * Math.PI * r * height - 2}, ${2 * Math.PI * r * (1 - height) + 2}`}
            strokeDashoffset={2 * Math.PI * r * start}
            style={{ zIndex }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}>
        </circle>
    );
};

export default Circle;