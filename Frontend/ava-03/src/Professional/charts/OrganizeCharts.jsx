import React, { useState, useEffect } from "react";
import { Box, } from '@mui/material';
import VoltageChart from "./VoltageChart";
import ChartTemplate from "./ChartTemplate";
import { rvcSignals } from "../util/dbDictionary";
import { multiplexSignals } from "../util/dbDictionary";
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

    //Can id 3
    const brakePressureData = dataSets.filter((data) => data?.msg_id === 0x003).map((data) => {
        return {
            time: data?.time,
            data: data?.decoded_data?.BrakePressure,
            msg_id: data?.msg_id,
        }
    })

    //Can id 4 (need to sort by the multiplex)
    const xAccelerationData = getRvcData(dataSets, 0);
    const yAccelerationData = getRvcData(dataSets, 1);
    const zAccelerationData = getRvcData(dataSets, 2);
    const xRotationData = getRvcData(dataSets, 3);
    const yRotationData = getRvcData(dataSets, 4);
    const zRotationData = getRvcData(dataSets, 5);

    //Can id 5 (probably need to sort by multiplex)
    const frontLeftTireRPMData = getTireRpmData(dataSets, 0);
    const frontRightTireRPMData = getTireRpmData(dataSets, 1);
    const rearLeftTireRPMData = getTireRpmData(dataSets, 2);
    const rearRightTireRPMData = getTireRpmData(dataSets, 3);

    //Can id 6 (most likely a multiplexed signal)
    const frontLeftTireTempInData = getTireTempData(dataSets, 0, 0);
    const frontLeftTireTempMidData = getTireTempData(dataSets, 0, 1);
    const frontLeftTireTempOutData = getTireTempData(dataSets, 0, 2);



    const frontRightTireTempInData = getTireTempData(dataSets, 1, 0);
    const frontRightTireTempMidData = getTireTempData(dataSets, 1, 1);
    const frontRightTireTempOutData = getTireTempData(dataSets, 1, 2);

    const backLeftTireTempInData = getTireTempData(dataSets, 2, 0);
    const backLeftTireTempMidData = getTireTempData(dataSets, 2, 1);
    const backLeftTireTempOutData = getTireTempData(dataSets, 2, 2);

    const backRightTireTempInData = getTireTempData(dataSets, 3, 0);
    const backRightTireTempMidData = getTireTempData(dataSets, 3, 1);
    const backRightTireTempOutData = getTireTempData(dataSets, 3, 2);

    //Can ID 0x0A0: Inverter temps 

    const inverterTempPhaseAData = getInverterTemperatureData(dataSets, "TempPhaseA");
    const inverterTempPhaseBData = getInverterTemperatureData(dataSets, "TempPhaseB");
    const inverterTempPhaseCData = getInverterTemperatureData(dataSets, "TempPhaseC");
    const gateDriverTemp = getInverterTemperatureData(dataSets, "GateDriverTemp");

    //Can ID 0x0A1: Control board temps
    const rtd1TempData = getControlBoardTemperatureData(dataSets, "RTD1");
    const rtd2TempData = getControlBoardTemperatureData(dataSets, "RTD2");
    const rtd3TempData = getControlBoardTemperatureData(dataSets, "RTD3");
    const controlBoardTempData = getControlBoardTemperatureData(dataSets, "ControlBoardTemp");







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
            {!hiddenCharts.has(0x000) && startSwitchData?.length > 0 &&
                <ChartTemplate
                    telemetryData={startSwitchData}
                    telemetryId={0}
                />}

            {!hiddenCharts.has(0x001) && throttle1PositionData?.length > 0 &&
                <ChartTemplate
                    telemetryData={throttle1PositionData}
                    telemetryId={0x001}
                />}

            {!hiddenCharts.has(0x002) && throttle2PositionData?.length > 0 &&
                <ChartTemplate
                    telemetryData={throttle2PositionData}
                    telemetryId={0x002}
                />}

            {!hiddenCharts.has(0x003) && brakePressureData?.length > 0 &&
                <ChartTemplate
                    telemetryData={brakePressureData}
                    telemetryId={0x003}
                />}

            {!hiddenCharts.has(0x004) && xAccelerationData?.length > 0 &&
                <ChartTemplate
                    telemetryData={xAccelerationData}
                    telemetryId={0x004}
                    multiplexId={0x000}
                />}

            {!hiddenCharts.has(0x004) && yAccelerationData?.length > 0 &&
                <ChartTemplate
                    telemetryData={yAccelerationData}
                    telemetryId={0x004}
                    multiplexId={0x001}
                />}

            {!hiddenCharts.has(0x004) && zAccelerationData?.length > 0 &&
                <ChartTemplate
                    telemetryData={zAccelerationData}
                    telemetryId={0x004}
                    multiplexId={0x002}
                />}

            {!hiddenCharts.has(0x004) && xRotationData?.length > 0 &&
                <ChartTemplate
                    telemetryData={xRotationData}
                    telemetryId={0x004}
                    multiplexId={0x003}
                />}

            {!hiddenCharts.has(0x004) && yRotationData?.length > 0 &&
                <ChartTemplate
                    telemetryData={yRotationData}
                    telemetryId={0x004}
                    multiplexId={0x004}
                />}

            {!hiddenCharts.has(0x004) && zRotationData?.length > 0 &&
                <ChartTemplate
                    telemetryData={zRotationData}
                    telemetryId={0x004}
                    multiplexId={0x005}
                />}

            {!hiddenCharts.has(0x005) && frontLeftTireRPMData?.length > 0 &&
                <ChartTemplate
                    telemetryData={frontLeftTireRPMData}
                    telemetryId={0x005}
                    multiplexId={0x000}

                />}

            {!hiddenCharts.has(0x005) && frontRightTireRPMData?.length > 0 &&
                <ChartTemplate
                    telemetryData={frontRightTireRPMData}
                    telemetryId={0x005}
                    multiplexId={0x001}

                />}

            {!hiddenCharts.has(0x005) && rearLeftTireRPMData?.length > 0 &&
                <ChartTemplate
                    telemetryData={rearLeftTireRPMData}
                    telemetryId={0x005}
                    multiplexId={0x002}

                />}

            {!hiddenCharts.has(0x005) && rearRightTireRPMData?.length > 0 &&
                <ChartTemplate
                    telemetryData={rearRightTireRPMData}
                    telemetryId={0x005}
                    multiplexId={0x003}

                />}

            {!hiddenCharts.has(0x006) && frontLeftTireTempInData?.length > 0 &&
                <ChartTemplate
                    telemetryData={frontLeftTireTempInData}
                    telemetryId={0x006}
                    multiplexId={0x000}
                />}

            {!hiddenCharts.has(0x006) && frontLeftTireTempMidData?.length > 0 &&
                <ChartTemplate
                    telemetryData={frontLeftTireTempMidData}
                    telemetryId={0x006}
                    multiplexId={0x000}
                />}

            {!hiddenCharts.has(0x006) && frontLeftTireTempOutData?.length > 0 &&
                <ChartTemplate
                    telemetryData={frontLeftTireTempOutData}
                    telemetryId={0x006}
                    multiplexId={0x000}
                />}



            {!hiddenCharts.has(0x006) &&
                frontRightTireTempInData?.length > 0 &&
                <ChartTemplate
                    telemetryData={frontRightTireTempInData}
                    telemetryId={0x006}
                    multiplexId={0x001}
                />}

            {!hiddenCharts.has(0x006) &&
                frontRightTireTempMidData?.length > 0 &&
                <ChartTemplate
                    telemetryData={frontRightTireTempMidData}
                    telemetryId={0x006}
                    multiplexId={0x001}
                />}

            {!hiddenCharts.has(0x006) &&
                frontRightTireTempOutData?.length > 0 &&
                <ChartTemplate
                    telemetryData={frontRightTireTempOutData}
                    telemetryId={0x006}
                    multiplexId={0x001}
                />}



            {!hiddenCharts.has(0x006) && backLeftTireTempInData?.length > 0 &&
                <ChartTemplate
                    telemetryData={backLeftTireTempInData}
                    telemetryId={0x006}
                    multiplexId={0x002}
                />}

            {!hiddenCharts.has(0x006) && backLeftTireTempMidData?.length > 0 &&
                <ChartTemplate
                    telemetryData={backLeftTireTempMidData}
                    telemetryId={0x006}
                    multiplexId={0x002}
                />}

            {!hiddenCharts.has(0x006) && backLeftTireTempOutData?.length > 0 &&
                <ChartTemplate
                    telemetryData={backLeftTireTempOutData}
                    telemetryId={0x006}
                    multiplexId={0x002}
                />}



            {!hiddenCharts.has(0x006) && backRightTireTempInData?.length > 0 &&
                <ChartTemplate
                    telemetryData={backRightTireTempInData}
                    telemetryId={0x006}
                    multiplexId={0x003}
                />}

            {!hiddenCharts.has(0x006) && backRightTireTempMidData?.length > 0 &&
                <ChartTemplate
                    telemetryData={backRightTireTempMidData}
                    telemetryId={0x006}
                    multiplexId={0x003}
                />}

            {!hiddenCharts.has(0x006) && backRightTireTempOutData?.length > 0 &&
                <ChartTemplate
                    telemetryData={backRightTireTempOutData}
                    telemetryId={0x006}
                    multiplexId={0x003}
                />}

            {!hiddenCharts.has(0x0A0) && inverterTempPhaseAData?.length > 0 &&
                <ChartTemplate
                    telemetryData={inverterTempPhaseAData}
                    telemetryId={0x0A0}
                />}

            {!hiddenCharts.has(0x0A0) && inverterTempPhaseBData?.length > 0 &&
                <ChartTemplate
                    telemetryData={inverterTempPhaseBData}
                    telemetryId={0x0A0}
                />}

            {!hiddenCharts.has(0x0A0) && inverterTempPhaseCData?.length > 0 &&
                <ChartTemplate
                    telemetryData={inverterTempPhaseCData}
                    telemetryId={0x0A0}
                />}

            {!hiddenCharts.has(0x0A0) && gateDriverTemp?.length > 0 &&
                <ChartTemplate
                    telemetryData={gateDriverTemp}
                    telemetryId={0x0A0}
                />}

            {!hiddenCharts.has(0x0A1) && rtd1TempData?.length > 0 &&
                <ChartTemplate
                    telemetryData={rtd1TempData}
                    telemetryId={0x0A1}
                />}

            {!hiddenCharts.has(0x0A1) && rtd2TempData?.length > 0 &&
                <ChartTemplate
                    telemetryData={rtd2TempData}
                    telemetryId={0x0A1}
                />}

            {!hiddenCharts.has(0x0A1) && rtd3TempData?.length > 0 &&
                <ChartTemplate
                    telemetryData={rtd3TempData}
                    telemetryId={0x0A1}
                />}

            {!hiddenCharts.has(0x0A1) && controlBoardTempData?.length > 0 &&
                <ChartTemplate
                    telemetryData={controlBoardTempData}
                    telemetryId={0x0A1}
                />}





            

















        </Box>
    )

}

function getRvcData(dataSets, multiplexId) {
    const signalName = rvcSignals[multiplexId];
    if (typeof signalName !== "string" || signalName.length === 0) {
        return [];
    }
    return dataSets.filter((data) => data?.msg_id === 0x004 && data?.decoded_data?.RVC_MultiPlex === multiplexId).map((data) => {
        return {
            time: data?.time,
            data: data?.decoded_data?.[signalName],
            msg_id: data?.msg_id
        }
    })
}

function getTireRpmData(dataSets, multiplexId) {
    const signalName = multiplexSignals[0x005]?.[multiplexId];
    if (typeof signalName !== "string" || signalName.length === 0) {
        return [];
    }

    return dataSets.filter((data) => data?.msg_id === 0x005 && data?.decoded_data?.TireRPM_MultiPlex === multiplexId).map((data) => {
        return {
            time: data?.time,
            data: data?.decoded_data?.[signalName],
            msg_id: data?.msg_id
        }
    })

}

function getTireTempData(dataSets, multiplexId, positionIndex) {
    const signalComponentMap = {
        0: "FrontLeft",
        1: "FrontRight",
        2: "RearLeft",
        3: "RearRight",
    }

    const positionMap = {
        0: "_Temp_In",
        1: "_Temp_Mid",
        2: "_Temp_Out",
    };


    const signalComponent = signalComponentMap[multiplexId];
    const positionSuffix = positionMap[positionIndex];
    if (typeof signalComponent !== "string" || typeof positionSuffix !== "string") {
        return [];
    }


    const signalName = signalComponent + positionSuffix;
    return dataSets.filter((data) => data?.msg_id === 0x006 && data?.decoded_data?.TireTemperature_MultiPlex === multiplexId).map((data) => {
        return {
            time: data?.time,
            data: data?.decoded_data?.[signalName],
            msg_id: data?.msg_id,
            multiplex_id: multiplexId,
        }
    })

}

function getInverterTemperatureData(dataSets, signalName) {
    if (typeof signalName !== "string" || signalName.length === 0) {
        return [];
    }
    return dataSets
        .filter((data) => data?.msg_id === 0x0A0)
        .map((data) => ({
            time: data?.time,
            data: data?.decoded_data?.[signalName],
            msg_id: data?.msg_id,
        }));
}

function getControlBoardTemperatureData(dataSets, signalName) {
    if (typeof signalName !== "string" || signalName.length === 0) {
        return [];
    }
    return dataSets
        .filter((data) => data?.msg_id === 0x0A1)
        .map((data) => ({
            time: data?.time,
            data: data?.decoded_data?.[signalName],
            msg_id: data?.msg_id,
        }));
}


//Todo: Add formatting to the charts when viewing from a phone.

export default OrganizeCharts;