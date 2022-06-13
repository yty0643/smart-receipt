import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import SignInBtn from '../../components/sign_in_btn/sign_in_btn';
import { setStateList } from '../../features/state_list/state_list_slice';
import { setTranList } from '../../features/tran_list/tran_list_slice';
import Finance from '../../service/finance';
import styles from './signup.module.css';

const Signup = ({ finance }: { finance: Finance }) => {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => (state.theme.isActive));
    const account: any = useSelector((state: RootState) => (state.selected.account));
    const [access_token] = useState<string | null>(window.localStorage.getItem('SR_access_token'));

    const onClick = () => {
        finance.authorize();
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
    };

    useEffect(() => {
        if (!window.location.search) return;
        finLogic(window.location.search.split('=')[1].split('&')[0]);
        window.location.search = "";
    }, [window.location.search]);

    useEffect(() => {
        if (Object.keys(account).length == 0) return;
        const random = Math.floor((Math.random() * (999999999 - 0) + 0)).toString().padStart(9, '0');
        finance.transactionDetails(access_token!, random, account.fintech_use_num)
            .then(res => {
                if (res.data.rsp_code != 'A0000')
                    throw new Error(res.data.rsp_message);
        
                const temp: any = [];
                res.data.res_list.map((item: any, index: number) => {
                    temp.push({
                        ...item,
                        after_balance_amt: Number(item.after_balance_amt),
                        tran_amt: Number(item.tran_amt),
                    });
                })
                dispatch(setTranList(temp));
                dispatch(setStateList({
                    hover: Array(temp.length).fill(false),
                    hide: Array(temp.length).fill(false),
                }));
            })
            .catch(error => console.log(error));
    }, [account]);

    return (
        <section className={`${styles.section} ${theme && styles.dark}`}>
            <p className={`${styles.title}`}>금융결제원 API를 통해 계좌를 등록하고 웹에서 제공되는 서비스를 이용하세요.</p>
            <p className={`${styles.description}`}>클릭시 오픈뱅킹 본인인증 페이지로 이동합니다.</p>
            <SignInBtn onClick={onClick} />
        </section>
    );
};

export default Signup;