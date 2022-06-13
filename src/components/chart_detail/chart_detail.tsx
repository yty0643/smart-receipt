import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const ChartDetail = () => {
    const category = useSelector((state: RootState) => (state.selected.category));
    useEffect(() => { 
        console.log(category);
    }, [category]);
    
    // setDetailList(() => {
    //     const temp: IDetail[] = [];
    //     for (let i = 0; i < size; i++) {
    //         const detail: IDetail = {
    //             total_amt: 0,
    //             tran_count: 0,
    //             tran_contents: [],
    //         }
    //         Object.values(category)[i].map(item => {
    //             detail.total_amt += tranList[item].tran_amt;
    //             detail.tran_count++;
    //             detail.tran_contents.push(tranList[item].print_content);
    //         });
    //         temp.push(detail);
    //     };
    //     return temp;
    // });

    return (
        <div>
            
        </div>
    );
};

export default ChartDetail;