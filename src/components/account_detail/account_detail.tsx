import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setTranList } from '../../features/tran_list/tran_list_slice';
import Finance from '../../service/finance';
import Chart from '../chart/chart';
import styles from './account_detail.module.css';

const AccountDetail = ({ finance }: { finance: Finance }) => {
    const dispatch = useDispatch();
    const account: any = useSelector((state: RootState) => (state.selectedAcc.account));
    const [access_token] = useState<string | null>(window.localStorage.getItem('SR_access_token'));
    
    useEffect(() => {
        if (Object.keys(account).length == 0) return;
        const random = Math.floor((Math.random() * (999999999 - 0) + 0)).toString().padStart(9, '0');
        finance.transactionDetails(access_token!, random, account.fintech_use_num)
            .then(res => {
                if (res.data.rsp_code != 'A0000')
                    throw new Error(res.data.rsp_message);
                dispatch(setTranList(res.data.res_list));
            })
            .catch(error => console.log(error));
    }, [account])

    return (
        <Chart />
    );
};

export default AccountDetail;