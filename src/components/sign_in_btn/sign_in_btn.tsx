import React from 'react';
import Finance from '../../service/finance';
import styles from './sign_in_btn.module.css';

const SignInBtn = ({ onClick }: { onClick: ()=>void }) => {
    return (
        <button className={styles.btn} onClick={onClick}>
            Join us
        </button>
    );
};

export default SignInBtn;