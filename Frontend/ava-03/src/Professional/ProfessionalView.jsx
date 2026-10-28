import React, { useState, useEffect } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import './ProfessionalView.css';

function ProfessionalView() {
    const [timestamp, setTimestamp] = useState(1);


    return (
        <div className="professional-view">
            {/* This select will allow for user to select which drive data to display */}
            <select>
                <option>option 1</option>
                <option>option 2</option>
            </select>

            <DataGrid
                rows={PopulateRows()}
                columns={PopulateColumns()}
                pageSize={5}
            />

            <BarChart
                xAxis={[
                    {
                        id: 'barCategories',
                        data: ['bar A', 'bar B', 'bar C'],
                        height: 28,
                    },
                ]}
                series={[
                    {
                        data: [2, 28, 3],
                    },
                ]}
                height={300}
            />
        </div>)
}

function PopulateRows() {
    // TODO: Implement row population logic
    // This function will be responsible for fetching and formatting ids for the DataGrid rows based on the title of the telemetry data.  It will mainly act as a way to turn on and off the display of certain telemetry.
    const tempRows = [{ id: 1, title: 'Telemetry 1' }, { id: 2, title: 'Telemetry 2' }]
    return tempRows;
}

function PopulateColumns() {
    //For all intents and purposes, this function will just be returning 1 column for now.  The column will be the title of the telemetry data.  This will be used to display the telemetry data in a table format.
    const tempColumns = [{ field: 'title', headerName: 'Telemetry Data', width: 200 }]
    return tempColumns;
}

export default ProfessionalView;

//TODO: Add a grid to display telemetry data in a table format; select data that you want to show (and add dynamic shifting to make it look good).