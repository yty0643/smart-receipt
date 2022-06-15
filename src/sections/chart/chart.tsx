import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import ChartBar from '../../components/chart_bar/chart_bar';
import ChartCircle from '../../components/chart_circle/chart_circle';
import ChartDetail from '../../components/chart_detail/chart_detail';
import ChartLine from '../../components/chart_line/chart_line';
import GaugeBar from '../../components/gauge_bar/gauge_bat';
import TranList from '../../components/tran_list/tran_list';
import { mouseEnter, mouseLeave } from '../../features/state_list/state_list_slice';
import { ITranItem } from '../../features/tran_list/tran_list_slice';
import styles from './chart.module.css';

export interface IProps{
    theme: boolean,
    tranList: ITranItem[],
    hoverList: boolean[],
    hideList: boolean[],
    heightArr: number[],
    onMouseEnter: (index: number) => void,
    onMouseLeave: (index: number) => void,
};

const Chart = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => (state.theme.isActive));
    const tranList = useSelector((state: RootState) => (state.tranList.list));
    const hoverList = useSelector((state: RootState) => (state.stateList.hover));
    const hideList = useSelector((state: RootState) => (state.stateList.hide));
    const [barHeightArr, setBarHeightArr] = useState<number[]>([]);
    const [lineHeightArr, setLineHeightArr] = useState<number[]>([]);

    const props: IProps = {
        theme,
        tranList,
        hoverList,
        hideList,
        heightArr: [],
        onMouseEnter: (index: number) => {
            dispatch(mouseEnter(index));
        },
        onMouseLeave: (index: number) => {
            dispatch(mouseLeave(index));
        },
    };

    const maxmin = (arr:number[]) => {
        let max = 1;
        let min = Number.MAX_SAFE_INTEGER;
        arr.map((item, index) => {
            if (!hideList[index]) {
                max = Math.max(item, max);
                min = Math.min(item, min);
            }
        });
        return { max, min };
    };

    useEffect(() => {
        setLineHeightArr(() => {
            let { max, min } = maxmin(tranList.map((item) => (item.after_balance_amt)));
            return Array(tranList.length).fill(0).map((item, index) => (Math.ceil((tranList[index].after_balance_amt - min) / (max - min) * 100 * 0.95) || 1))
        });
        
        setBarHeightArr(() => {
            let { max, min } = maxmin(tranList.map((item) => (item.tran_amt)));
            return Array(tranList.length).fill(0).map((item, index) => (Math.ceil(tranList[index].tran_amt / max * 100)));
        });
    }, [hideList]);

    return (
        <section className={`${styles.section} ${theme && styles.dark}`}>
            <p className={`${styles.title} ${theme && styles.dark}`}>거래 통계</p>
            <p className={`${styles.description} ${theme && styles.dark}`}>선택된 계좌의 거래통계입니다.</p>
            <div className={styles.chart1}>
                <TranList {...props} />
                <ChartBar {...props} heightArr={barHeightArr} />
                <ChartLine {...props} heightArr={lineHeightArr} />
            </div>
            <div className={styles.chart1}>
                <ChartCircle />
                <ChartDetail />
                <GaugeBar />
            </div>
        </section>
    );
};

export default Chart;