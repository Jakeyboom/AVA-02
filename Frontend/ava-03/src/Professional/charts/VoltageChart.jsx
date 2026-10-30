import React, { useState, useEffect } from "react";
import { LineChart } from '@mui/x-charts';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { Paper, } from '@mui/material';
import '../ProfessionalView.css';



function VoltageChart() {
    const [timestamp, setTimestamp] = useState(1);
    return (
        <Paper>
            <LineChart
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

export default VoltageChart;