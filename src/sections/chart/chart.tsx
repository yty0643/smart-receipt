import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import ChartBar from '../../components/chart_bar/chart_bar';
import ChartCircle from '../../components/chart_circle/chart_circle';
import ChartDetail from '../../components/chart_detail/chart_detail';
import ChartLine from '../../components/chart_line/chart_line';
import GaugeBar from '../../components/gauge_bar/gauge_bat';
import TranList from '../../components/tran_list/tran_list';
import styles from './chart.module.css';
const Chart = () => {
    const theme = useSelector((state: RootState) => (state.theme.isActive));

    return (
        <section className={`${styles.section} ${theme && styles.dark}`}>
            <p className={`${styles.title} ${theme && styles.dark}`}>거래 통계</p>
            <p className={`${styles.description} ${theme && styles.dark}`}>선택된 계좌의 거래통계입니다.</p>
            <div className={styles.chart1}>
                <TranList />
                <ChartBar />
                <ChartLine />
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