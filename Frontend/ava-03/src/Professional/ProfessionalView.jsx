import React, { useState, useEffect } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { Box, Paper, FormLabel, FormGroup, FormControl, FormControlLabel, Checkbox, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
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
                minHeight: "100vh",
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
                        height: '40vh',
                        backgroundColor: '#112b30',
                        color: 'white',
                        border: 'solid thin lightblue',
                    }}>
                    <Accordion>
                        <AccordionSummary>
                            Telemetry Data
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormControl>
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
                        </AccordionDetails>
                    </Accordion>
                </Paper>


                <OrganizeCharts enabled={enabled} />

                {enabled && <Paper
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
                </Paper>}
            </Box>






        </Box>



    )
}


export default ProfessionalView;

//TODO: Add a grid to display telemetry data in a table format; select data that you want to show (and add dynamic shifting to make it look good).