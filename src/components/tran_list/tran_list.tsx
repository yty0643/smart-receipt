import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const TranList = () => {
    const tranList = useSelector((state: RootState) => (state.tranList.list));
    console.log(tranList);
    return (
        <div>
            
        </div>
    );
};

export default TranList;