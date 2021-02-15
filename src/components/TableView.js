// imports
import React from 'react';
import Table from 'react-bootstrap/Table';

// fill in the header of the table with the keys of one object in data array
// fill in the rows of the body with the corresponding values of that key in each object
export default function TableView({ data }) {
    return (
        Object.keys(data).length !== 0 &&
            <Table responsive striped bordered hover variant="dark" className="tableView">
                <thead>
                    <tr>
                        {Object.keys(data[0]).map((key, i) =>
                            key === "d" ? <th key={i}>date</th> : <th key={i}>{key}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => <tr key={i}>{ 
                                                Object.keys(item).map((key, i) => 
                                                    <td key={i}>{item[key]}</td>
                                                )
                                            }</tr>)}
                </tbody>
            </Table>
    );
}
