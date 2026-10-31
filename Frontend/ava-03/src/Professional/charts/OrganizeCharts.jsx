import React, { useState, useEffect } from "react";
import { Box, } from '@mui/material';
import VoltageChart from "./VoltageChart";
import ChartTemplate from "./ChartTemplate";
import '../ProfessionalView.css';

//This function will provide ProfessionalView with all of the charts preformatted.
//For right now, it will just return a couple of bar charts.
function OrganizeCharts({ enabled, dataSets }) {

    return (
        <Box className="charts-container"
            sx={{
                flex: 1,
                minWidth: 0,
                display: "grid",
                gridTemplateColumns: "repeat(1, minmax(0, 1fr))",

                overflowY: "auto",

            }
            }>
            <ChartTemplate />
            <ChartTemplate />
        </Box>
    )

}

//Todo: Add formatting to the charts when viewing from a phone.

export default OrganizeCharts;