import React, { useState, useEffect } from "react";
import { LineChart, BarChart } from '@mui/x-charts';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { Paper, } from '@mui/material';
import '../ProfessionalView.css';

//This function will just provide an example of a chart.
function ChartTemplate({xAxisData, yAxisData}) {
    const [loading, setLoading] = useState(false);
    const exampleData = [
    { time: 0, speed: 0, rpm: 800 },
    { time: 1, speed: 5, rpm: 1200 },
    { time: 2, speed: 12, rpm: 1800 },
    { time: 3, speed: 20, rpm: 2400 },
    { time: 4, speed: 28, rpm: 3100 },
    { time: 5, speed: 35, rpm: 3800 },
    { time: 6, speed: 42, rpm: 3200 },
    { time: 7, speed: 48, rpm: 3600 },
    { time: 8, speed: 55, rpm: 4200 },
    { time: 9, speed: 60, rpm: 3500 },
    { time: 10, speed: 65, rpm: 3900 },
];

    return (
        <Paper
            sx={{
                height: "15vh",
                border: "thin solid lightblue",
                backgroundColor: "#112b30",
            }}>
            <LineChart
                sx={{
                    color: "white",
                    height: "100%",
                    "& .MuiChartsAxis-line": {
                        stroke: "white",
                        strokeWidth: 2,
                    },

                    "& .MuiChartsAxis-tickLabel": {
                        fill: "white",
                    },

                    "& .MuiChartsAxis-tick": {
                        stroke: "white",
                        strokeWidth: 1,
                    },

                    "& .MuiChartsLineSeries-line": {
                        stroke: "orange",
                        strokeWidth: 2,
                    }
                }}
                dataset={exampleData}
                loading={loading}
                xAxis={[
                    {
                        id: 'barCategories',
                        dataKey: 'time',
                        height: 28,
                        tickLabelStyle: {
                            fill: "white",
                        }
                    },
                ]}
                yAxis={[
                    {
                        label: 'Speed (m/s)',
                    }
                ]}
                series={[
                    {
                        dataKey: 'speed',
                        label: 'Vehicle Speed',
                        color: '#42a5f5',
                        showMark: true,
                    },
                ]}
            />
        </Paper>
    )

}

export default ChartTemplate;

//TODO: Find what is causing the chart lines to display strangely.