import React from 'react';
import Finance from '../../service/finance';
import styles from './sign_in_btn.module.css';

const SignInBtn = ({ finance }: { finance: Finance }) => {
    const authorize = () => {
        finance.authorize();
    };
    return (
        <button className={styles.btn} onClick={authorize}>
            Join us
        </button>
    );
};

export default SignInBtn;