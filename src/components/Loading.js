// imports
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

// styles import
import './Styles.css';

// provides a spinner to let user know application is loading data
export default function Loading() {
    return (
        <div className="loading">
            <Spinner
                animation="border"
                variant="primary"/>
            <span>Loading...</span> 
        </div>
    );
}