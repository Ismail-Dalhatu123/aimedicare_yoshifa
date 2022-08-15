import svg from "./svg";

export const vitals = [
  {
    title: "Podometer",
    label: "Steps",
    svg: svg.vitals.pmeter,
    value: 0,
  },
  {
    title: "Sleep",
    label: "",
    svg: svg.vitals.sleep,
    value: 0,
    label: "hrs",
  },
  {
    title: "Heart Rate",
    label: "BPM",
    svg: svg.vitals.heartRate,
    value: 0,
  },
  {
    title: "Blood Pressure",
    label: "mmHg",
    svg: svg.vitals.bp,
    value: "0/0",
  },
  {
    title: "ECG",
    label: "",
    svg: svg.vitals.ecg,
    isECG: true,
  },
  {
    title: "HRV",
    label: "HRV",
    svg: svg.vitals.hvr,
    value: 0,
  },
  {
    title: "Blood Oxygen",
    label: "",
    svg: svg.vitals.bo,
    value: "0%",
  },
];
