import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import BtnText from '../../components/btn_text/btn_text';
import Finance from '../../service/finance';
import styles from './signup.module.css';

const Signup = ({ finance }: { finance: Finance }) => {
    const theme = useSelector((state: RootState) => (state.theme.isActive));

    const onClick = () => {
        alert("")
        // finance.authorize();
    };

    const finLogic = (access_code: string) => {
        finance
            .generateToken(access_code!)
            .then(res => {
                if ('rsp_code' in res.data) {
                    if (res.data.rsp_code != 'A0000') {
                        console.log(res);
                        throw new Error(res.data.rsp_message);
                    }
                }
                const now = new Date();
                const expire = new Date().setDate(now.getDate() + (res.data.expires_in / 60 / 60 / 24));
                window.localStorage.setItem('SR_user_seq_no', res.data.user_seq_no);
                window.localStorage.setItem('SR_access_token', res.data.access_token);
                window.localStorage.setItem('SR_expires_in', expire.toString());
                return {
                    user_seq_no: res.data.user_seq_no,
                    access_token: res.data.access_token,
                }
            })
            .then(res => finance.userInfoCheck(res.user_seq_no, res.access_token))
            .then(res => {
                if (res.data.rsp_code != 'A0000')
                    throw new Error(res.data.rsp_message);
                window.localStorage.setItem('SR_account_list', JSON.stringify(res.data.res_list));
                window.localStorage.setItem('SR_fintech_use_num', res.data.res_list[1].fintech_use_num);
            })
            .then(()=>{window.location.search = "";})
            .catch(error => {
                console.log(error)
            });
    };

    useEffect(() => {
        if (!window.location.search) return;
        finLogic(window.location.search.split('=')[1].split('&')[0]);
    }, [window.location.search]);

    return (
        <section className={`${styles.section} ${theme && styles.dark}`}>
            <div className={`${styles.contents} ${theme && styles.dark}`}>
                <div className={`${styles.box1} ${theme && styles.dark}`}>
                    <p className={`${styles.title}`}>금융결제원 API를 통해 계좌를 등록하고 웹에서 제공되는 서비스를 이용하세요.</p>
                    <p className={`${styles.subTitle}`}>금융결제원 API을 Axios로 사용하고 있습니다. 총 네 가지 과정을 거쳐 등록된 계좌의 거래 내역을 조회하도록 설계했습니다.</p>
                    <p className={`${styles.description}`}>사용자 인증 - 토큰 발급 - 사용자 정보 조회 - 거래 내역 조회</p>
                </div>
                <div className={styles.box2}>
                    <BtnText onClick={onClick} text={"Join us"} />
                </div>
            </div>
        </section>
    );
};

export default Signup;