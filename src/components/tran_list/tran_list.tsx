import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { ITranItem, mouseClick, mouseEnter, mouseLeave } from '../../features/tran_list/tran_list_slice';
import styles from './tran_list.module.css';

const TranList = () => {
    const dispatch = useDispatch();
    const tranList = useSelector((state: RootState) => (state.tranList.list));
    const theme = useSelector((state: RootState) => (state.theme.isActive));
    const onMouseEnter = (item:ITranItem) => {
        dispatch(mouseEnter(item.key));
    }
    const onMouseLeave = (item:ITranItem) => {
        dispatch(mouseLeave(item.key));
    }

    const onClick = (item:ITranItem) => {
        dispatch(mouseClick(item.key));
    }
    return (
        <div className={styles.section}>
            <button className={styles.upBtn}>
                <FontAwesomeIcon icon={faAngleUp} />
            </button>
            <div className={styles.list}>
                {tranList.map(item => (
                    <p
                        className={`${styles.item} ${item.hover && styles.hover} ${item.hide && styles.hide}`}
                        onClick={() => { onClick(item) }}
                        onMouseEnter={() => { onMouseEnter(item) }}
                        onMouseLeave={() => { onMouseLeave(item) }}>
                        {item.print_content}</p>
                ))}
            </div>
            <button className={styles.downBtn}>
                <FontAwesomeIcon icon={faAngleDown} />
            </button>
        </div>
    );
};

export default TranList;