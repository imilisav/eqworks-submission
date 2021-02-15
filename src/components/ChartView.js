// imports
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Tooltip, Legend, XAxis, YAxis } from 'recharts';

// custom react hook, keeping track of window size
import useWindowSize from '../hooks/useWindowSize';

export default function ChartView({ data, isEvents }) {
    // state that stores window dimensions from custom hook
    const windowSize = useWindowSize();

    // state to verify that data is non-empty from API
    const [isDataValid, setIsDataValid] = useState(false);
    useEffect(() => {
        if (Object.keys(data).length !== 0) {
            setIsDataValid(true);
        }
    }, [data, isEvents]);

    // check data is non-empty, render event chart or 3 stats charts depending on user input if so.
    // using windowsize to specify the height, width of charts, subtracting multiples of 1rem (16px) for even spacing between charts.
    return(
        isDataValid && (isEvents ? 
            <div className="chartView">
                <BarChart width={windowSize.width-16*4} height={windowSize.height-16*11} data={data}>
                    <XAxis dataKey="d"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend verticalAlign="top"/>
                    <Bar fill="#000080" dataKey="events"/>
                </BarChart>
            </div> 
            :
            <div className="chartView">
                <BarChart width={windowSize.width/3-16*4} height={windowSize.height-16*11} data={data}>
                    <XAxis dataKey="d"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend verticalAlign="top"/>
                    <Bar fill="#800000" dataKey="clicks"/>
                </BarChart>
                <BarChart width={windowSize.width/3-16*4} height={windowSize.height-16*11} data={data}>
                    <XAxis dataKey="d"/>
                    <YAxis width={70}/>
                    <Tooltip/>
                    <Legend verticalAlign="top"/>
                    <Bar fill="#800080" dataKey="impressions"/>
                </BarChart>
                <BarChart width={windowSize.width/3-16*4} height={windowSize.height-16*11} data={data}>
                    <XAxis dataKey="d"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend verticalAlign="top"/>
                    <Bar fill="#008000" dataKey="revenue"/>
                </BarChart>
            </div>
        ) 
    );
}