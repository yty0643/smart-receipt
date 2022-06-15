import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { mouseClick } from '../../features/state_list/state_list_slice';
import { IProps } from '../../sections/chart/chart';
import TranItem from './tran_item';
import styles from './tran_list.module.css';

const TranList = ({ theme, tranList, hoverList, hideList, onMouseEnter, onMouseLeave }: IProps) => {
    const dispatch = useDispatch();
    const onClick = (index: number) => {
        dispatch(mouseClick(index));
    };

    return (
        <div className={styles.section}>
            <button className={styles.upBtn}>
                <FontAwesomeIcon icon={faAngleUp} />
            </button>
            <div className={styles.list}>
                {tranList.map((item, index) => (
                    <TranItem
                        key={index}
                        item={item.print_content}
                        hover={hoverList[index]}
                        hide={hideList[index]}
                        onClick={() => { onClick(index) }}
                        onMouseEnter={() => { onMouseEnter(index) }}
                        onMouseLeave={() => { onMouseLeave(index) }} />
                ))}
            </div>
            <button className={styles.downBtn}>
                <FontAwesomeIcon icon={faAngleDown} />
            </button>
        </div>
    );
};

export default React.memo(TranList);