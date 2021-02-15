// imports
import React, { useState, useEffect } from 'react';

// custom components
import TableView from './TableView';
import ChartView from './ChartView';

export default function({ data, isEvents, isTable, timeFrame }) {

    // state to verify that this component has received non-empty data from API
    const [isDataValid, setIsDataValid] = useState(false);
    useEffect(() => {
        if (Object.keys(data).length !== 0) { 
            setIsDataValid(true);
        }
    }, [data, timeFrame, isEvents, isTable]);

    return (
        !isDataValid ? <span>No data.</span> : ( isTable ? <TableView data={data}/> : <ChartView data={data} isEvents={isEvents}/> )
    );
}
