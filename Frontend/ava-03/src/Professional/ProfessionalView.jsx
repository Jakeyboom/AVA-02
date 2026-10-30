import React, { useState, useEffect } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { Box, Paper, FormLabel, FormGroup, FormControl, FormControlLabel, Checkbox } from '@mui/material';
import GPSMap from "./charts/GPSMap";
import OrganizeCharts from "./charts/OrganizeCharts";
import './ProfessionalView.css';

function ProfessionalView() {
    const [timestamp, setTimestamp] = useState(1);
    const [enabled, setEnabled] = useState(true);


    return (
        <Box className="professional-view"

            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "calc(100vh - 60px)",
                boxSizing: "border-box",
                padding: "1vw",
                backgroundColor: "#122625",
                overflowY: "auto",
            }}>

            <Box id="top-panel"
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                <select>
                    <option>option 1</option>
                    <option>option 2</option>
                </select>
            </Box>

            {/* This select will allow for user to select which drive data to display */}

            <Box id="middle-panel"
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    width: "100%",
                    minWidth: 0,
                    gap: "1vw",
                }}
            >
                {/* TODO: Implement dynamic FormControlLabel generation based on imported telemetry data ids. */}
                <Paper
                    sx={{
                        padding: '1vw',
                        height: '40vh'

                    }}>
                    <FormControl>
                        <FormLabel component="legend">Select Data </FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Telemetry 1"
                                onChange={(e) => {
                                    // Handle checkbox change
                                    setEnabled(e.target.checked);
                                }}
                            />
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Telemetry 1"
                            />

                        </FormGroup>
                    </FormControl>
                </Paper>


                <OrganizeCharts enabled={enabled} />

                <Paper
                    sx={{
                        width: "40vw",
                        height: "78vh",
                        minWidth: 0,
                        
                        flexShrink: 0,
                        padding: "1vw",
                        boxSizing: "border-box",
                        overflow: "hidden",
                    }}
                >
                    <GPSMap />
                </Paper>
            </Box>






        </Box>



    )
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