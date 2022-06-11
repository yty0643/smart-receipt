import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { mouseClick, mouseEnter, mouseLeave } from '../../features/state_list/state_list_slice';
import styles from './tran_list.module.css';

const TranList = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => (state.theme.isActive));
    const tranList = useSelector((state: RootState) => (state.tranList.list));
    const hoverList = useSelector((state: RootState) => (state.stateList.hover));
    const hideList = useSelector((state: RootState) => (state.stateList.hide));

    const onMouseEnter = (index: number) => {
        dispatch(mouseEnter(index));
    };

    const onMouseLeave = (index: number) => {
        dispatch(mouseLeave(index));
    };
    
    const onClick = (index: number) => {
        dispatch(mouseClick(index));
    };

    return (
        <div className={styles.section}>
            <button className={styles.upBtn}>
                <FontAwesomeIcon icon={faAngleUp} />
            </button>
            <div className={styles.list}>
                {tranList.length != 0 &&
                    tranList.map((item, index) => (
                        <p
                            key={index}
                            className={`${styles.item} ${hoverList[index] && styles.hover} ${hideList[index] && styles.hide}`}
                            onClick={() => { onClick(index) }}
                            onMouseEnter={() => { onMouseEnter(index) }}
                            onMouseLeave={() => { onMouseLeave(index) }}>
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