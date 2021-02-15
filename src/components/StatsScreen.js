// imports
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { IoClose } from "react-icons/io5";
import CsvDownload from 'react-json-to-csv';

// custom components
import DataView from './DataView';

// styles imports
import './Styles.css';

export default function StatsScreen({ visibleClass, closeCallback, poi }) {
    // state for keeping track if user wants data in daily, weekly, monthly, yearly format
    const [timeFrame, setTimeFrame] = useState("daily");

    // state for event view or stats view, second state shows data in table vs chart
    const [isEvents, setIsEvents] = useState(true);
    const [isTable, setIsTable] = useState(true);

    // get events and stats data, if user changes characteristics of data, pull new event data from api
    const [eventsData, setEventsData] = useState({});
    const [statsData, setStatsData] = useState({});
    useEffect(() => {
        if (isEvents) {
            fetch("https://eqworks-milisav-api-submission.glitch.me/events/" + timeFrame + "/" + poi.poi_id)
                .then(response => response.json())
                .then(response => setEventsData(response))
        } else {
            fetch("https://eqworks-milisav-api-submission.glitch.me/stats/" + timeFrame + "/" + poi.poi_id)
                .then(response => response.json())
                .then(response => setStatsData(response))
        }
    }, [isEvents, timeFrame, visibleClass]);

    // state to hold all POI hourly data for user to download as CSV if desired
    const [eventsCSVData, setEventsCSVData] = useState([]);
    const [statsCSVData, setStatsCSVData] = useState([]);
    useEffect(() => {
        fetch("https://eqworks-milisav-api-submission.glitch.me/events/hourly/" + poi.poi_id)
            .then(response => response.json())
            .then(response => setEventsCSVData(response))

        fetch("https://eqworks-milisav-api-submission.glitch.me/stats/hourly/" + poi.poi_id)
            .then(response => response.json())
            .then(response => setStatsCSVData(response))
    }, [visibleClass]);

    return (
        <div id="stats_screen" className={ visibleClass }>

            <div className="header">
                <h1>{poi.name}</h1>
                <Button variant="outline-primary" onClick={closeCallback}>
                    <IoClose className="backBtn"/>
                </Button>
            </div>

            <div className="preferencesSection">

                <div className="preferencesSectionGroup">
                    <Button variant="primary" onClick={() => setIsEvents(true)}>{poi.name} Events</Button>
                    <Button variant="primary" onClick={() => setIsEvents(false)}>{poi.name} Statistics</Button>
                </div>

                <div className="preferencesSectionGroup">
                    <Button variant="secondary" onClick={() => setIsTable(true)}>Table View</Button>
                    <Button variant="secondary" onClick={() => setIsTable(false)}>Chart View</Button>
                </div>

                <div className="preferencesSectionGroup">
                    <Button variant="dark" onClick={() => setTimeFrame("daily")}>Daily</Button>
                    <Button variant="dark" onClick={() => setTimeFrame("weekly")}>Weekly</Button>
                    <Button variant="dark" onClick={() => setTimeFrame("monthly")}>Monthly</Button>
                    <Button variant="dark" onClick={() => setTimeFrame("yearly")}>Yearly</Button>
                </div>

                <div className="preferencesSectionGroup">

                    <CsvDownload 
                        className="downloadBtn" 
                        data={eventsCSVData} 
                        filename={"events_data_" + poi.name + ".csv"}>
                        Download Events CSV
                    </CsvDownload>

                    <CsvDownload 
                        className="downloadBtn" 
                        data={statsCSVData} 
                        filename={"stats_data_" + poi.name + ".csv"}>
                        Download Stats CSV
                    </CsvDownload>
                </div>

            </div>

            <DataView
                data={isEvents ? eventsData : statsData}
                isEvents={isEvents}
                isTable={isTable}
                timeFrame={timeFrame}/>

        </div>
    );
}
