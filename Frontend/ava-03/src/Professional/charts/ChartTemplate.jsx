import React, { useState, useEffect } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { Paper, } from '@mui/material';
import '../ProfessionalView.css';

//This function will just provide an example of a chart.
function ExampleChart() {
    const [timestamp, setTimestamp] = useState(1);
    return(
        <Paper>
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
    </Paper>
    )

}

export default ExampleChart;