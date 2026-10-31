import React, { useState, useEffect } from "react";
import {LineChart, BarChart } from '@mui/x-charts';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { Paper, } from '@mui/material';
import '../ProfessionalView.css';

//This function will just provide an example of a chart.
function ChartTemplate() {
    const [timestamp, setTimestamp] = useState(1);
    return (
        <Paper
        sx={{
            height: "10vh",
            border: "thin solid lightblue",
            backgroundColor: "#112b30",
        }}>
            <LineChart
            sx={{
                height: "100%",
                "& .MuiChartsAxis-line": {
                    stroke: "white",
                },

                "& .MuiChartsAxis-tickLabel": {
                    fill: "white",
                },

                "& .MuiChartsAxis-tick": {
                    stroke: "white",
                }
            }}
            margin={{bottom: -5}}
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
            />
        </Paper>
    )

}

export default ChartTemplate;