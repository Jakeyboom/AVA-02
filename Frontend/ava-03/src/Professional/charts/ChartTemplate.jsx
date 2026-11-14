import React, { useState, useEffect } from "react";
import { LineChart, BarChart } from '@mui/x-charts';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { infoDict, dbDict } from "../util/dbDictionary";
import { Paper, } from '@mui/material';
import '../ProfessionalView.css';

//This function will just provide an example of a chart.
function ChartTemplate({ telemetryData, telemetryId }) {
    const [loading, setLoading] = useState(false);


    return (
        <Paper
            sx={{
                height: "200px",
                border: "thin solid lightblue",
                backgroundColor: "#112b30",
            }}>
            <LineChart

                dataset={telemetryData}
                loading={loading}
                xAxis={[
                    {
                        id: 'barCategories',
                        dataKey: 'time',
                        height: 29,
                        tickLabelStyle: {
                            fill: "white",
                        }
                    },
                ]}
                yAxis={[
                    {
                        label: infoDict[telemetryId] || "Telemetry Data",
                        width: 70,
                        tickLabelStyle: {
                            fill: "white",
                        },
                        labelStyle: {
                            fill: "white",
                        },
                    },
                ]}
                series={[
                    {
                        dataKey: 'data',
                        label: 'Vehicle Speed',
                        color: '#42a5f5',
                    },
                ]}

                sx={{
                    height: "100%",
                    color: "white",

                    "&& .MuiChartsAxis-line": {
                        stroke: "white",
                        strokeWidth: 2,
                    },

                    "&& .MuiChartsAxis-tick": {
                        stroke: "white",
                    },

                    "&& .MuiChartsAxis-tickLabel": {
                        fill: "white",
                    },

                    "&& .MuiChartsAxis-label": {
                        fill: "white",
                    },
                }} />
        </Paper>
    )

}

export default ChartTemplate;

//TODO: Find what is causing the chart lines to display strangely.