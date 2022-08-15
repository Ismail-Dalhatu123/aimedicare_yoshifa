import EVENTS from "./Events";
import WatchModule, { eventEmitter } from "./WatchModule";

export const connectToWatch = (setIsConnecting, device) => {
  if (!device) return;
  setIsConnecting(true);
  WatchModule.connect(device.address, device.name);
};

export const addSmartWatchListeners = ({
  onConnect,
  onHeartDataChange,
  onBloodOxygenDataChange,
  onBloodPressureDataChange,
  onFailedToConnect,
  setIsSmartWatchConnected,
  onBatteryLeveChange,
}) => {
  eventEmitter.addListener(EVENTS.DEVICE_CONNECT, onConnect);
  eventEmitter.addListener(EVENTS.DEVICE_IS_NOT_CONNECTING, onFailedToConnect);
  eventEmitter.addListener(EVENTS.DEVICE_DISCONNECTED, () => {
    setIsSmartWatchConnected(false);
  });
  eventEmitter.addListener(EVENTS.RECEIVE_HEART_DATA, onHeartDataChange);
  eventEmitter.addListener(EVENTS.RECEIVE_BP_DATA, onBloodPressureDataChange);
  eventEmitter.addListener(EVENTS.RECEIVE_OXYGEN_DATA, onBloodOxygenDataChange);
  eventEmitter.addListener(
    EVENTS.DEVICE_BATTER_LEVE_CHANGE,
    onBatteryLeveChange
  );
};

const removeAll = () => {
  // eventEmitter
};
