import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import styles from './btn_arrow.module.css';

const BtnArrow = ({ icon, onClick }: { icon: IconProp, onClick:()=>void }) => {
    const theme = useSelector((state: RootState) => (state.theme.isActive));
    return (
        <button className={`${styles.btn} ${theme && styles.dark}`} onClick={onClick}>
            <FontAwesomeIcon icon={icon} />
        </button>
    );
};

export default BtnArrow;