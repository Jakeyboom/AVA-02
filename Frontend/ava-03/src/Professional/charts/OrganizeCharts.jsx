import React, { useState, useEffect } from "react";
import { Box, } from '@mui/material';
import VoltageChart from "./VoltageChart";
import ChartTemplate from "./ChartTemplate";
import '../ProfessionalView.css';

//This function will provide ProfessionalView with all of the charts preformatted.
//For right now, it will just return a couple of bar charts.
function OrganizeCharts({ hiddenCharts, dataSets }) {

    //Now, we need to format the dataSets to be used in an easy format for the charts.
    //The easiest way to do this is to create a function that will take in the dataSets and return potentially a map of the dataSets
    //Stored at a specific msg_id.  Then, within this map, we can have the actually data values stored in an array of objects.
    //This will need to be an implementation that accounts for the fact that a decoded_data object can have multiple represented "messages",
    //Such as frontLeftTirePressure, frontRightTirePressure, rearLeftTirePressure, rearRightTirePressure, and so on.  So, we will need to create a function that will take in the dataSets and return a map of the dataSets stored at a specific msg_id.  Then, within this map, we can have the actual data values stored in an array of objects.
    //In essence, it will take on the following format (remembering that it is easiest to have the x coordinates be the timestamp and the y coordinates be the data values):
    /*
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
]
    //For now, let's just try to get CanID 0 to be displayed in a chart: 0x000: "StartSwitch",

    */

    const startSwitchData = dataSets.filter((data) => data?.msg_id === 0).map((data) => {
        return {
            time: data?.time,
            data: data?.decoded_data?.StartSwitch,
            msg_id: data?.msg_id,
        }
    })

    //Now, we will do canID 1 (Throttle1Position)

    const throttle1PositionData = dataSets.filter((data) => data?.msg_id === 1).map((data) => {
        return {
            time: data?.time,
            data: data?.decoded_data?.Throttle1Position,
            msg_id: data?.msg_id,
        }
    })

    //Now, we will do canID 2
    //TODO: Check if AVA Sender test script is sending throttle 2 data.
    const throttle2PositionData = dataSets.filter((data) => data?.msg_id === 2).map((data) => {
        return {
            time: data?.time,
            data: data?.decoded_data?.Throttle2Position,
            msg_id: data?.msg_id,
        }
    })

    const brakePressureData = dataSets.filter((data) => data?.msg_id === 0x003).map((data) => {
        return {
            time: data?.time,
            data: data?.decoded_data?.BrakePressure,
            msg_id: data?.msg_id,
        }
    })



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
            {!hiddenCharts.has(0x000) &&
                <ChartTemplate
                    telemetryData={startSwitchData}
                    telemetryId={0}
                />}

            {!hiddenCharts.has(0x001) &&
                <ChartTemplate
                    telemetryData={throttle1PositionData}
                    telemetryId={0x001}
                />}

            {!hiddenCharts.has(0x002) &&
                <ChartTemplate
                    telemetryData={throttle2PositionData}
                    telemetryId={0x002}
                />}

            {!hiddenCharts.has(0x003) &&
                <ChartTemplate
                    telemetryData={brakePressureData}
                    telemetryId={0x003}
                />}



        </Box>
    )

}

function filterDataByMsgId(dataSets, msgId) {
    return dataSets.filter((data) => data?.msgId === msgId);
}

//Todo: Add formatting to the charts when viewing from a phone.

export default OrganizeCharts;