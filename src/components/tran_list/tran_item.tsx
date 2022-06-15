import React from 'react';
import styles from './tran_item.module.css';

interface IProps {
    item: string,
    hover: boolean,
    hide: boolean,
    onClick: () => void,
    onMouseEnter: () => void,
    onMouseLeave: () => void,
};

const TranItem = ({ item,hover,hide,onClick,onMouseEnter,onMouseLeave}:IProps) => {
    return (
        <p
            className={`${styles.item} ${hover&& styles.hover} ${hide && styles.hide}`}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}>
            {item}
        </p>
    );
};

export default React.memo(TranItem);