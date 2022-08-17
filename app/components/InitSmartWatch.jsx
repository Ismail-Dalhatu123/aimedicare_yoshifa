import { useContext, useEffect, useRef, useState } from "react";
import AppContext from "../contexts/AppContext";
import { addSmartWatchListeners, connectToWatch } from "../modules/Listeners";
import { StyleSheet } from "react-native";
import store from "../store";
import KEYS from "../store/keys";
import Alert from "./Alert";
import ENUMS from "../tools/enums";
import useClient from "../hooks/useClient";
import WatchModule from "../modules/WatchModule";

const InitSmartWatch = () => {
  const [connectionFailed, setConnectionFailed] = useState(false);
  const [heartRate, setHeartRate] = useState(null);
  const [bloodPressure, setBloodPressure] = useState({});
  const [bloodOxygen, setBloodOxygen] = useState({});
  const [batteryLevel, setBatteryLevel] = useState(0);
  const heartRateCount = useRef(0);
  const bloodPressureCount = useRef(0);
  const {
    smartWatchData,
    setSmartWatchData,
    isSmartWatchConnected,
    setIsWatchConnecting,
    setIsSmartWatchConnected,
    smartWatchInfo,
    user,
  } = useContext(AppContext);
  const { addHeartReading, addBloodPressure } = useClient();

  const getStoredWatchData = async () => {
    const data = await store.getData(KEYS.SMART_WATCH_DATA);
    if (data) {
      setHeartRate(smartWatchData.heartRate);
      setBloodOxygen(smartWatchData.bloodOxygen);
      setBloodPressure(smartWatchData.bloodPressure);
      setBatteryLevel(smartWatchData.batteryLevel);
    }
  };

  useEffect(() => {
    if (!isSmartWatchConnected && smartWatchInfo) {
      connectToWatch(setIsSmartWatchConnected);
    }
  }, [user]);

  useEffect(() => {
    // if (isSmartWatchConnected) {
    addSmartWatchListeners({
      onConnect: () => {
        setIsWatchConnecting(false);
        setIsSmartWatchConnected(true);
      },
      onFailedToConnect: () => setIsWatchConnecting(false),
      onBloodOxygenDataChange: setBloodOxygen,
      onBloodPressureDataChange: setBloodPressure,
      onHeartDataChange: setHeartRate,
      onBatteryLeveChange: setBatteryLevel,
      setIsWatchConnecting,
      setIsSmartWatchConnected,
    });
    // }
  }, []);

  useEffect(() => {
    if (smartWatchData) {
      store.storeData(KEYS.SMART_WATCH_DATA, smartWatchData);
    }
  }, [smartWatchData]);

  useEffect(() => {
    console.log(`Record Heart Rate: ${heartRateCount.current}`);
    if (heartRateCount.current >= 20) {
      WatchModule.stopDetectHeart();
      WatchModule.startDetectBP();
    } else {
      if (heartRate?.data) {
        addHeartReading(heartRateCount, heartRate.data);
      }
    }
    setSmartWatchData({ ...smartWatchData, heartRate });
  }, [heartRate]);

  useEffect(() => {
    setSmartWatchData({ ...smartWatchData, batteryLevel });
  }, [batteryLevel]);

  useEffect(() => {
    console.log(`Record BloodPressure:`, bloodPressureCount.current);
    if (bloodPressureCount.current >= 10) {
      WatchModule.stopDetectBP();
      WatchModule.startDetectHeart();
    } else {
      if (bloodPressure) {
        addBloodPressure(bloodPressureCount, bloodPressure);
        WatchModule.startDetectBP();
      }
    }
    setSmartWatchData({ ...smartWatchData, bloodPressure });
  }, [bloodPressure]);

  useEffect(() => {
    setSmartWatchData({ ...smartWatchData, bloodOxygen });
  }, [bloodOxygen]);

  useEffect(() => {
    getStoredWatchData();
  }, []);

  if (connectionFailed)
    return (
      <Alert
        visible={true}
        remove={() => setConnectionFailed(false)}
        style={styles.alert}
        type={ENUMS.ERROR}
        message="Device failed to connect!"
      />
    );
  return null;
};
export default InitSmartWatch;

const styles = StyleSheet.create({
  alert: {
    position: "absolute",
    bottom: 0,
  },
});
