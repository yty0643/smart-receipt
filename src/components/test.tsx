import React, { useEffect, useState } from 'react';
import Finance from '../service/finance';

const Test = ({ finance }: { finance: Finance }) => {
    const [access_code, setAccess_code] = useState<string>();
    const [user_seq_no, setUser_seq_no] = useState<string | null>(window.localStorage.getItem('SR_user_seq_no'));
    const [access_token, setAccess_token] = useState<string | null>(window.localStorage.getItem('SR_access_token'));
    const [expire, setExpire] = useState<string | null>(window.localStorage.getItem('SR_expires_in'));
    const [fintech_use_num, setFintech_use_num] = useState<string | null>(window.localStorage.getItem('SR_fintech_use_num'));
    const [userData, setUserData] = useState<object>({});

    const authorize = () => {
        finance.authorize();
    };

    const generateToken = () => {
        if (!access_code) {
            console.log("Not found access_code!");
            return;
        };
        finance.generateToken(access_code)
            .then(res => {
                if ('rsp_message' in res.data)
                    throw new Error(res.data.rsp_message);
                
                const now = new Date();
                const expire = new Date().setDate(now.getDate() + (res.data.expires_in / 60 / 60 / 24));

                setUser_seq_no(res.data.user_seq_no); // 사용자 고유번호
                window.localStorage.setItem('SR_user_seq_no', res.data.user_seq_no);
                setAccess_token(res.data.access_token); // 토큰
                window.localStorage.setItem('SR_access_token', res.data.access_token);
                setExpire(expire.toString()); // 토큰 만료일자
                window.localStorage.setItem('SR_expires_in', expire.toString());
            })
            .catch(error => console.log(error));
    };

    const userInfoCheck = () => {
        if (!user_seq_no || !access_token) {
            console.log("Not found user_seq_no | access_token");
            return;
        };
        finance.userInfoCheck(user_seq_no, access_token)
            .then(res => {
                setFintech_use_num(res.data.res_list[1].fintech_use_num);
                window.localStorage.setItem('SR_fintech_use_num', res.data.res_list[0].fintech_use_num);
            })
            .catch(error => console.log(error));
    };

    const transactionDetails = () => {
        if (!access_token || !fintech_use_num) {
            console.log("Not found access_token | fintech_use_num");
            return;
        };
        const random = Math.floor((Math.random() * (999999999 - 0) + 0)).toString().padStart(9, '0');
        finance.transactionDetails(access_token, random, fintech_use_num)
            .then(res => {
                setUserData(res.data);
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        if (!window.location.search) return;
        setAccess_code(window.location.search.split('=')[1].split('&')[0]);
    }, [window.location.search]);

    useEffect(() => {
        const now = new Date();
        const expire = new Date().setDate(now.getDate() + 90);
    }, [userData]);
    
    return (
        <div>
            <button onClick={authorize}>Authorize</button>
            <button onClick={generateToken}>generateToken</button>
            <button onClick={userInfoCheck}>userInfoCheck</button>
            <button onClick={transactionDetails}>transactionDetails</button>
        </div>
    );
};

export default Test;
