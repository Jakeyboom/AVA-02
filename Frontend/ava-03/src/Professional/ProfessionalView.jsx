import React, { useState, useEffect, useMemo, useId } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { Box, Paper, FormLabel, FormGroup, FormControl, FormControlLabel, Checkbox, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import GPSMap from "./charts/GPSMap"; import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import OrganizeCharts from "./charts/OrganizeCharts";
import { fetchDrives, fetchData } from "./hooks/useFetchData";

import './ProfessionalView.css';
import dbDict from "./util/dbDictionary"

function ProfessionalView() {
    const [drives, setDrives] = useState([]);
    const [selectedDrive, setSelectedDrive] = useState(null);
    const [timestamp, setTimestamp] = useState(1);
    const [enabled, setEnabled] = useState(true);
    const [telemetryData, setTelemetryData] = useState([]);
    const id = useId();

    //Fetches drives to populate the select dropdown.  This allows for the user to select which drive data to show.
    useEffect(() => {
        let cancelled = false;

        const loadDrives = async () => {
            try {
                const drives = await fetchDrives();

                if (!cancelled) {
                    setDrives(drives);
                }
            } catch (error) {
                if (!cancelled) {
                    console.error("Error fetching drives:", error);
                }
            }
        };

        loadDrives();
        console.log("Drives: ", drives);

        return () => {
            cancelled = true;
        };

    }, []);

    //This useEffect will fetch the telemetry data for the selected drive.  It will also set the telemetry tags to display from the fetched data.
    useEffect(() => {
        let cancelled = false;
        const loadTelemetryData = async () => {
            try {
                const data = await fetchData(selectedDrive);
                if (!cancelled && data != null) {
                    setTelemetryData(data.raw_data);
                }
            } catch (error) {
                if (!cancelled) {
                    console.error("Error fetching telemetry tags:", error);

                }
            }
        }

        loadTelemetryData();
        //This will be terrible, but I am going to make a map containing the temeletry data Ids.  This WILL set the same thing a bunch of times, but should work until I find a better implementation.


        return () => {
            cancelled = true;
        };
    }, [selectedDrive]);

    const telemetryTags = useMemo(() => {
        const uniqueIds = new Set(
            telemetryData
                .filter((item) => item?.msg_id != null)
                .map((item) => item.msg_id)
        );

        return [...uniqueIds];
    }, [telemetryData]);



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
                <select
                    onChange={(e) => setSelectedDrive(e.target.value)}
                >
                    {
                        drives.map((drive) => (<option key={drive.drive_id} value={drive.drive_id}>{drive.date}</option>))
                    }
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
                        <AccordionSummary
                            expandIcon={<ArrowDownwardIcon />}
                            aria-controls={`${id}-telemetry-panel-content`}
                            id={`${id}-telemetry-panel-header`}
                        >
                            Telemetry Data
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                height: "100%",
                            }}
                        >
                            <FormControl>
                                <FormGroup>
                                    {
                                        telemetryTags.map((tag) => (
                                            <FormControlLabel
                                                key={tag}
                                                control={<Checkbox />}
                                                label={dbDict[tag] || `CANid: ${tag}`}
                                                checked={true}
                                            />
                                        ))
                                    }
                                </FormGroup>
                            </FormControl>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ArrowDownwardIcon />}
                            aria-controls={`${id}-lap-panel-content`}
                            id={`${id}-lap-panel-header`}
                        >
                            Choose Lap
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                height: "100%",
                            }}
                        >
                            <FormControl>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox defaultChecked />}
                                        label="Lap 1"
                                        onChange={(e) => {
                                            // Handle checkbox change
                                            setEnabled(e.target.checked);
                                        }}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox defaultChecked />}
                                        label="Lap 2"
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
                    <GPSMap dataSets={telemetryData.filter((data) => data?.msg_id === 9)} />
                </Paper>}
            </Box>






        </Box>



    )
}


export default ProfessionalView;

//TODO: Add a grid to display telemetry data in a table format; select data that you want to show (and add dynamic shifting to make it look good).