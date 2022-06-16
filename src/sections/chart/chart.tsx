import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import ChartBar from '../../components/chart_bar/chart_bar';
import ChartCircle from '../../components/chart_circle/chart_circle';
import ChartLine from '../../components/chart_line/chart_line';
import GaugeBar from '../../components/gauge_bar/gauge_bat';
import TranList from '../../components/tran_list/tran_list';
import { mouseEnter, mouseLeave, setHideList } from '../../features/transaction/transaction_slice';
import { ITranItem, setTranList } from '../../features/transaction/transaction_slice';
import Finance from '../../service/finance';
import styles from './chart.module.css';

export interface IProps{
    theme: boolean,
    tranList: ITranItem[],
    hideList: boolean[],
    focusIdx: number,
    heightArr: number[],
    maxMin: { max: number, min: number, start:number, end:number },
    onMouseEnter: (index: number) => void,
    onMouseLeave: (index: number) => void,
};

export interface IProps2{
    theme: boolean,
    cateList: { [key: string]: ITranItem[] }[],
    category: string[],
    bgColor: string[],
    focusIdx: number,
    idx: number,
    heightArr: number[],
    onMouseEnter: (key: number, index: number) => void,
};

const Chart = ({ finance }: { finance: Finance }) => {
    const dispatch = useDispatch();
    const account: any = useSelector((state: RootState) => (state.selected.account));
    const [access_token] = useState<string | null>(window.localStorage.getItem('SR_access_token'));
    const theme = useSelector((state: RootState) => (state.theme.isActive));
    const tranList = useSelector((state: RootState) => (state.transaction.tranList));
    const hideList = useSelector((state: RootState) => (state.transaction.hideList));
    const tranFocusIdx = useSelector((state: RootState) => (state.transaction.focusIdx));
    const [cateList, setCateList] = useState<{ [key: string]: ITranItem[] }[]>([]);
    const [cateFocusIdx, setCateFocusIdx] = useState<number>(-1);
    const [detaFocusIdx, setDetaFocusIdx] = useState<number>(-1);
    const [barHeightArr, setBarHeightArr] = useState<number[]>([]);
    const [lineHeightArr, setLineHeightArr] = useState<number[]>([]);
    const [circleheightArr, setCircleheightArr] = useState<number[]>([]);
    const [detailHeightArr, setDetailHeightArr] = useState<number[]>([]);
    const [barMaxMin, setBarMaxMin] = useState<any>({});
    const [LineMaxMin, setLineMaxMin] = useState<any>({});
    const [values, setValues] = useState<any>({});
    const category = ['카페', '편의점, 마트', '주유소', '음식점', '카카오페이', '기타'];
    const [category2, setCategory2] = useState<string[]>([]);
    const keyword = [
        ['카페', '더벤티'],
        ['세븐일레븐', '편의점', '마트'],
        ['주유소'],
        ['맥도날드', '닭', '국밥', '김밥'],
        ['카카오'],
        [],
    ];
    const bgColor = [
        "rgb(146, 218, 118 )",
        "rgb(118, 218, 205 )",
        "rgb(118, 146, 218 )",
        "rgb(183, 118, 218 )",
        "rgb(218, 118, 153 )",
        "rgb(218, 183, 118 )",
        "rgb(118, 146, 218 )",
        "rgb(183, 118, 218 )",
    ];

    const props: IProps = {
        theme,
        tranList,
        hideList,
        focusIdx: tranFocusIdx,
        heightArr: [],
        maxMin: { max: 0, min: 0, start: 0, end: 0 },
        onMouseEnter: (index) => {
            dispatch(mouseEnter(index));
        },
        onMouseLeave: (index) => {
            dispatch(mouseLeave(index));
        },
    };

    const props2: IProps2 = {
        theme,
        cateList,
        category,
        bgColor,
        focusIdx: -1,
        idx: 0,
        heightArr: [],
        onMouseEnter: (key, index) => {
            switch (key) {
                case 1: setCateFocusIdx(index);
                    break;
                case 2: setDetaFocusIdx(index);
                    break;
                default:
                    break;
            }
        },
    };

    const findMaxMin = (arr: number[]) => {
        let max = 1;
        let min = Number.MAX_SAFE_INTEGER;
        let start = 0;
        let end = 0;
        arr.map((item, index) => {
            if (!hideList[index]) {
                if (!start) start = Number(tranList[index].tran_date);
                end = Number(tranList[index].tran_date);
                max = Math.max(item, max);
                min = Math.min(item, min);
            }
        });
        if (max == 1) min = 0;
        start = start % 10000 / 100;
        end = end % 10000 / 100;
        return { max, min, start, end };
    };

    const strCmp: (str: string, arr: string[]) => boolean = (str, arr) => {
        if (arr.length == 0) return true;
        for (let i = 0; i < arr.length; i++) {
            if (str.indexOf(arr[i]) >= 0)
                return true;
        }
        return false;
    };


    useEffect(() => {
        setDetailHeightArr([]); // 차트 초기화 용
        setCateFocusIdx(-1); // 차트 초기화 용
        if (Object.keys(account).length == 0) return;
        finance.transactionDetails(access_token!, account.fintech_use_num)
            .then(res => {
                if (res.data.rsp_code != 'A0000')
                    throw new Error(res.data.rsp_message);
                
                const temp = res.data.res_list.map((item: ITranItem, index: number) => ({
                    ...item,
                    after_balance_amt: Number(item.after_balance_amt),
                    tran_amt: Number(item.tran_amt),
                }));
                dispatch(setTranList(temp));
                dispatch(setHideList(Array(temp.length).fill(false)));
            })
            .catch(error => console.log(error));
    }, [account]);

    useEffect(() => {
        setBarHeightArr(() => {
            let { max, min, start, end } = findMaxMin(tranList.map((item, index) => (item.tran_amt)));
            setBarMaxMin({ max, min: 0, start, end });
            return Array(tranList.length).fill(0).map((item, index) => (Math.ceil(tranList[index].tran_amt / max * 100)));
        });
        
        setLineHeightArr(() => {
            let { max, min, start, end } = findMaxMin(tranList.map((item) => (item.after_balance_amt)));
            setLineMaxMin({ max, min, start, end });
            return Array(tranList.length).fill(0).map((item, index) => (Math.ceil((tranList[index].after_balance_amt - min) / (max - min) * 100 * 0.95) || 1))
        });

        setCircleheightArr(() => {
            let count = 0;
            const size = category.length;
            const temp: { [key: string]: ITranItem[] }[] = Array(size).fill({}).map((item, index) => ({ [`${category[index]}`]: [] }));
            tranList.map((item: ITranItem, index: number) => {
                if (!hideList[index]) {
                    for (let i = 0; i < size; i++) {
                        if (strCmp(item.print_content, keyword[i])) {
                            temp[i][`${category[i]}`].push(item);
                            count++;
                            break;
                        }
                    }
                }
            });
            setCateList(temp);
            return Object.values(temp).map((item, index) => (item[`${category[index]}`].length / (count || 1)));
        });
    }, [hideList]);

    useEffect(() => {
        if (cateFocusIdx == -1) return;
        setDetailHeightArr(() => {
            const temp: { [key: string]: ITranItem[] } = {};
            const list = Object.values(cateList[cateFocusIdx])[0];
            list.map(item => {
                if (`${item.print_content}` in temp)
                    temp[`${item.print_content}`].push(item);
                else
                    temp[`${item.print_content}`] = [item];
            });
            setCategory2(Object.keys(temp));
            return Object.values(temp).map((item, index) => (item.length / list.length));
        });
    }, [hideList, cateFocusIdx]);

    useEffect(() => {
        if (detaFocusIdx == -1) return;
        setValues(() => {
            const temp = {
                amt: 0,
                cnt: 0,
                totalAmt: 0,
                totalCnt: 0,
                globalAmt: 0,
                globalCnt: 0,
            };
            tranList.map((item) => {
                temp.globalAmt += item.tran_amt;
            })
            hideList.map((item) => {
                if (item)
                    temp.globalCnt++;
            })
            Object.values(cateList[cateFocusIdx])[0].map((item) => {
                if (item.print_content == category2[detaFocusIdx]) {
                    temp.amt += item.tran_amt;
                    temp.cnt++;
                }
                temp.totalAmt += item.tran_amt;
                temp.totalCnt++;
            });
            return temp;
        });
    }, [hideList, detaFocusIdx]);

    return (
        <section className={`${styles.section} ${theme && styles.dark}`}>
            <div className={`${styles.contents} ${theme && styles.dark}`}>
                <div className={styles.box1}>
                    <p className={`${styles.title} ${theme && styles.dark}`}>선택한 계좌의 거래내역을 분석한 그래프를 제공합니다.</p>
                    <p className={`${styles.subTitle} ${theme && styles.dark}`}>리덕스로 관리하고 있는 거래데이터를 라이브러리 없이 그래프로 구현했습니다.</p>
                    <p className={`${styles.description} ${theme && styles.dark}`}>최대한 코드 중복을 피하고자 했습니다.</p>
                </div>
                <div className={styles.box2}>
                    <TranList {...props} />
                    <div className={styles.chart}>
                        <ChartBar {...props} heightArr={barHeightArr} maxMin={barMaxMin} />
                        <ChartLine {...props} heightArr={lineHeightArr} maxMin={LineMaxMin} />
                    </div>
                    <div className={styles.chart}>
                        <ChartCircle {...props2} idx={1} focusIdx={cateFocusIdx} heightArr={circleheightArr} />
                        <ChartCircle {...props2} category={category2} idx={2} focusIdx={detaFocusIdx} heightArr={detailHeightArr} />
                    </div>
                    <div className={styles.chart}>
                        <div>
                            <p className={`${styles.subTitle} ${theme && styles.dark}`}>Local</p>
                            <GaugeBar title={"비용"} value={values.amt} total={values.totalAmt} />
                            <GaugeBar title={"횟수"} value={values.cnt} total={values.totalCnt} />
                            <p className={`${styles.subTitle} ${theme && styles.dark}`}>Global</p>
                            <GaugeBar title={"비용"} value={values.amt} total={values.globalAmt} />
                            <GaugeBar title={"횟수"} value={values.cnt} total={values.globalCnt} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(Chart);