import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Finance from '../../service/finance';
import { IBar } from '../chart/bar';
import Chart from '../chart/chart';
import styles from './account_detail.module.css';


const AccountDetail = ({ finance }: { finance: Finance }) => {
    const account: any = useSelector((state: RootState) => (state.selectedAcc.account));
    const [access_token] = useState<string | null>(window.localStorage.getItem('SR_access_token'));
    const [tranData, setTranData] = useState<any[]>([]);

    const [chartData, setChartData] = useState<IBar[]>([]);
    
    const createChart = (arr: any[]) => {
        const temp: IBar[] = [];

        let max: number = 0;
        arr.map((item) => {
            max = max < Number(item.tran_amt) ? Number(item.tran_amt) : max;
        })

        arr.map((item) => {
            temp.push({
                bgColor: item.inout_type == "입금" ? "rgb(103, 143, 243)" : "rgb(231, 115, 115)",
                height: Math.ceil(Number(item.tran_amt) / max * 100),
                balance: item.after_balance_amt,
                inout: item.inout_type,
                content: item.print_content,
                amount: item.tran_amt,
                date: item.tran_date,
                time: item.tran_time,
                type: item.tran_type,
            });
        })
        return temp;
    };

    useEffect(() => {
        if (Object.keys(account).length == 0) return;
        const random = Math.floor((Math.random() * (999999999 - 0) + 0)).toString().padStart(9, '0');
        finance.transactionDetails(access_token!, random, account.fintech_use_num)
            .then(res => {
                if (res.data.rsp_code != 'A0000')
                    throw new Error(res.data.rsp_message);
                setTranData(res.data.res_list);
            })
            .catch(error => console.log(error));
    }, [account])

    useEffect(() => {
        if (!tranData) return;
        setChartData(createChart(tranData));
    }, [tranData])

    return (
        <Chart chartData={chartData} />
    );
};

export default AccountDetail;