const dbDict = {
    0x0AA: "InternalStates",
    0x0C1: "ParameterCommand",
    0x0C2: "ParameterResponse",
    0x0C0: "ControlCommand",
    0x0B1: "TorqueCapability",
    0x0B0: "HighSpeed",
    0x0AD: "ModulationIndex",
    0x0AC: "TorqueAndTimerInfo",
    0x0AB: "FaultCodes",
    0x0A9: "InternalVoltages",
    0x0A8: "FluxInfo",
    0x0A7: "VoltageInfo",
    0x0A6: "CurrentInfo",
    0x0A5: "MotorPositionInfo",
    0x0A4: "DigitalInputStatus",
    0x0A3: "AnalogInputVoltages",
    0x0A2: "MotorTemps",
    0x0A1: "ControlBoardTemps",
    0x0A0: "InverterTemps",
    0x006: "TireTemperature",
    0x005: "TireRPM",
    0x004: "RVC",
    0x009: "GPS",
    0x000: "StartSwitch",
    0x001: "Throttle1Position",
    0x002: "Throttle2Position",
    0x003: "BrakePressure",
}

const infoDict = {
    0x0AA: "InternalStates",
    0x0C1: "ParameterCommand",
    0x0C2: "ParameterResponse",
    0x0C0: "ControlCommand",
    0x0B1: "TorqueCapability",
    0x0B0: "HighSpeed",
    0x0AD: "ModulationIndex",
    0x0AC: "TorqueAndTimerInfo",
    0x0AB: "FaultCodes",
    0x0A9: "InternalVoltages",
    0x0A8: "FluxInfo",
    0x0A7: "VoltageInfo",
    0x0A6: "CurrentInfo",
    0x0A5: "MotorPositionInfo",
    0x0A4: "DigitalInputStatus",
    0x0A3: "AnalogInputVoltages",
    0x0A2: "MotorTemps",
    0x0A1: "ControlBoardTemps",
    0x0A0: "InverterTemps",
    0x006: "TireTemperature",
    0x005: "TireRPM",
    0x004: "RVC",
    0x009: "GPS",
    0x000: "ON/OFF", //This is the StartSwitch, which is always on or off.
    0x001: "Throttle1Position",
    0x002: "Throttle2Position",
    0x003: "BrakePressure",
}

const rvcSignals = {
    0: "X_Acceleration",
    1: "Y_Acceleration",
    2: "Z_Acceleration",
    3: "X_Rotation",
    4: "Y_Rotation",
    5: "Z_Rotation",
};

const multiplexSignals = {
    0x004: {
        0: "X_Acceleration",
        1: "Y_Acceleration",
        2: "Z_Acceleration",
        3: "X_Rotation",
        4: "Y_Rotation",
        5: "Z_Rotation",
    },

    0x005: {
        0: "FrontLeft",
        1: "FrontRight",
        2: "RearLeft",
        3: "RearRight",
    },
}


export { dbDict };
export { infoDict };
export { rvcSignals }
export { multiplexSignals }